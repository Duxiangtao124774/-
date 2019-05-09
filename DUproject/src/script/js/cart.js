! function($) {
    //1.渲染商品列表, 传入两个参数，一个id和数量，根据id和数量渲染整个可见的列表.
    function goodslist(id, count) {
        $.ajax({
            url: 'http://10.31.163.147:1247/duxiangtao/-dxt/DUproject/php/cart.php', //获取所有的接口数据
            dataType: 'json'
        }).done(function(data) {
            $.each(data, function(index, value) {
                if (id == value.sid) { //遍历判断sid和传入的sid是否相同，方便将那条数据设置到渲染的商品列表中。

                    $('.product-wrapper').find('.li2').find('img').attr('src', value.indexpic);
                    $('.product-wrapper').find('.li2').find('img').attr('sid', value.sid);
                    $('.product-wrapper').find('.li2').find('p').html(value.name + value.discrip);
                    $('.product-wrapper').find('.li4').find('em').html(value.price);
                    $('.product-wrapper').find('.li5').find('input').val(count);
                    //计算每个商品的价格。
                    $('.product-wrapper').find('.li6').html((value.price * count).toFixed(2));

                    $('.product').append($('.product-wrapper'));
                    priceall(); //计算总价的
                }
            });
        })
    }
    //2.获取cookie，执行渲染列表的函数
    if ($.cookie('sid') && $.cookie('num')) {
        var s = $.cookie('sid').split(','); //数组sid
        var n = $.cookie('num').split(','); //数组num
        $.each(s, function(i, value) {
            goodslist(s[i], n[i]);
        });
    }

    //4.计算总价和总的商品件数，必须是选中的商品。
    function priceall() {
        var $sum = 0;
        var $count = 0;
        $('.product-wrapper').each(function(index, element) {
            if ($(element).find('label input').prop('checked')) {
                $sum += parseInt($(element).find('.li5').find('input').val());
                $count += parseFloat($(element).find('.li6').html());
            }
        });

        $('.p5').find('em').html($sum);
        $('.p4').html('￥' + $count.toFixed(2));
    }

    //5.全选操作
    $('.allselect').on('change', function() {
        $('.product-wrapper').find(':checkbox').prop('checked', $(this).prop('checked'));
        $('.allselect').prop('checked', $(this).prop('checked'));
        priceall(); //取消选项，重算总和。
    });

    var $inputs = $('.product-wrapper').find(':checkbox');
    $('.product').on('change', $inputs, function() { //事件的委托的this指向被委托的元素
        if ($('.product-wrapper').find('input:checkbox').length == $('.product-wrapper').find('input:checked').size()) {
            $('.allselect').prop('checked', true);
        } else {
            $('.allselect').prop('checked', false);
        }
        priceall(); //取消选项，重算总和。
    });

    //6.数量的改变
    //改变商品数量++
    $('.add').on('click', function() {
        var $count = $(this).parents('.product-wrapper').find('.li5 input').val(); //值
        $count++;
        if ($count >= 99) {
            $count = 99;
        }
        $(this).parents('.product-wrapper').find('.li5 input').val($count); //赋值回去
        $(this).parents('.product-wrapper').find('.li6').html(singlegoodsprice($(this))); //改变后的价格
        priceall(); //重新计算总和。
        $.cookie($(this)); //将改变的数量重新添加到cookie

    });

    //改变商品数量--
    $('.decrease').on('click', function() {
        var $count = $(this).parents('.product-wrapper').find('.li5 input').val();
        $count--;
        if ($count <= 1) {
            $count = 1;
        }
        $(this).parents('.product-wrapper').find('.li5 input').val($count);
        $(this).parents('.product-wrapper').find('.li6').html(singlegoodsprice($(this))); //改变后的价格
        priceall();
        $.cookie($(this));
    });

    //直接输入改变数量
    $('.li5 input').on('input', function() {
        var $reg = /^\d+$/g; //只能输入数字
        var $value = parseInt($(this).val());
        if ($reg.test($value)) { //是数字
            if ($value >= 99) { //限定范围
                $(this).val(99);
            } else if ($value <= 0) {
                $(this).val(1);
            } else {
                $(this).val($value);
            }
        } else { //不是数字
            $(this).val(1);
        }
        $(this).parents('.product-wrapper').find('.li6').html(singlegoodsprice($(this))); //改变后的价格
        priceall();
        $.cookie($(this));
    });

    //7.计算数量改变后单个商品的价格
    function singlegoodsprice(obj) { //obj:当前元素
        var $dj = parseFloat(obj.parents('.product-wrapper').find('.li4').find('em').html()); //单价
        var $cnum = parseInt(obj.parents('.product-wrapper').find('.li5 input').val()); //数量
        return ($dj * $cnum).toFixed(2); //结果
    }

    //8.将改变后的数量的值存放到cookie
    //点击按钮将商品的数量和id存放cookie中
    var arrsid = []; //商品的id
    var arrnum = []; //商品的数量
    //提前获取cookie里面id和num
    function cookietoarray() {
        if ($.cookie('sid') && $.cookie('num')) {
            arrsid = $.cookie('sid').split(','); //cookie商品的sid  
            arrnum = $.cookie('num').split(','); //cookie商品的num
        }
    }

    function setcookie(obj) { //obj:当前操作的对象
        cookietoarray(); //得到数组
        var $index = obj.parents('.product-wrapper').find('img').attr('sid'); //通过id找数量的位置
        arrnum[$.inArray($index, arrsid)] = obj.parents('.product-wrapper').find('.li5 input').val();
        $.cookie('num', arrnum, 7);
    }

    //9.删除操作
    //删除cookie
    function delgoodslist(sid, arrsid) { //sid：当前删除的sid，arrsid:cookie的sid的值
        var $index = -1;
        $.each(arrsid, function(index, value) { //删除的sid对应的索引位置。 index:数组项的索引
            if (sid == value) {
                $index = index; //如果传入的值和数组的值相同，返回值对应的索引。
            }
        });
        arrsid.splice($index, 1); //删除数组对应的值
        arrnum.splice($index, 1); //删除数组对应的值
        addcookie('cookiesid', arrsid, 7); //添加cookie
        addcookie('cookienum', arrnum, 7); //添加cookie
    }

    //删除单个商品的函数(委托)
    $('.item-list').on('click', '.b-action a', function(ev) {
        cookietoarray(); //得到数组,上面的删除cookie需要。
        if (confirm('你确定要删除吗？')) {
            $(this).first().parents('.goods-info').remove(); //通过当前点击的元素找到整个一行列表，删除
        }
        delgoodslist($(this).first().parents('.goods-info').find('img').attr('sid'), arrsid);
        priceall();
    });


    //删除全部商品的函数
    $('.operation a:first').on('click', function() {
        cookietoarray(); //得到数组,上面的删除cookie需要。
        if (confirm('你确定要全部删除吗？')) {
            $('.goods-item:visible').each(function() {
                if ($(this).find('input:checkbox').is(':checked')) { //复选框一定是选中的
                    $(this).remove();
                    delgoodslist($(this).find('img').attr('sid'), arrsid);
                }
            });
            priceall();
        }
    });


}(jQuery);