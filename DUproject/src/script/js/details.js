; //渲染详情页数据
(function($) {
    var $sid = location.search.substr(5);
    console.log($sid)
    $.ajax({
        url: 'http://10.31.163.147:1247/duxiangtao/-dxt/DUproject/php/detail.php',
        data: {
            sid: $sid
        },
        dataType: 'json',
        success: function(data) {
            // 察看后端返回的数据
            console.log(data)
            var $listarr = data.spiclist.split('&');
            console.log($listarr) //spiclist小图标的地址
            var $listStr = '';
            $('.spic').find('.spic-pic').attr('src', data.bpic).attr('sid', data.sid);
            $('.bf').find('img').attr('src', data.bpic);
            $('.detail').find('h3').html(data.name + data.discrip);
            $('.detail .priceinfo').find('strong').html('￥' + data.price)
            $.each($listarr, function(index, value) {
                $listStr += `<li><img src="${value}"></li>`
            })
            $('.smallpic ul').html($listStr)
            $('title').html(data.discrip)

            // 加入放大镜效果
            class scale {
                constructor() {
                    this.bigwrap = $('.big-wrapper')
                    this.wrap = $('.content');
                    this.spic = $('.spic');
                    this.bpic = $('.bpic');
                    this.sf = $('.sf');
                    this.bf = $('.bf');
                    this.list = $('.smallpic li');
                    this.ul = $('.smallpic ul');
                }
                init() {
                    // console.log(this.bigwrap.offset().left) //31.33333396911621
                    // console.log(this.bigwrap.offset().top) //211
                    // console.log(this.wrap.offset().top)
                    // console.log(this.spic.offset().top) //211
                    // console.log(this.sf.offset().top) //552
                    let _this = this;
                    this.spic.hover(function() {
                        _this.over();
                    }, function() {
                        _this.out();
                    });

                    this.list.on('click', function() {
                        _this.liclick(this); //this:当前操作的li元素
                    });

                }
                over() {
                    let _this = this;
                    this.sf.show();
                    this.bf.show()

                    //计算小放的尺寸和比例
                    this.sf.width(this.spic.width() * this.bf.width() / this.bpic.width())
                    this.sf.height(this.spic.height() * this.bf.height() / this.bpic.height())

                    this.bili = this.bpic.width() / this.spic.width();
                    this.spic.on('mousemove', function(e) {
                        _this.move(e);
                    });
                }
                out() {
                    this.sf.hide();
                    this.bf.hide();
                }
                move(e) {
                    let l = e.pageX - this.bigwrap.offset().left - this.sf.width() / 2;
                    let t = e.pageY - this.bigwrap.offset().top - this.sf.height() / 2;
                    if (l <= 0) {
                        l = 0
                    } else if (l >= this.spic.width() - this.sf.width()) {
                        l = this.spic.width() - this.sf.width()
                    }

                    if (t <= 0) {
                        t = 0
                    } else if (t >= this.spic.height() - this.sf.height()) {
                        t = this.spic.height() - this.sf.height()
                    }
                    this.sf.css({
                        left: l,
                        top: t
                    });

                    this.bpic.css({
                        left: -this.bili * l,
                        top: -this.bili * t
                    })
                }

                liclick(li) {
                    let $imgurl = $(li).find('img').attr('src');
                    $(li).addClass('active').siblings('li').removeClass('active');
                    this.spic.find('img').attr('src', $imgurl);
                    this.bpic.attr('src', $imgurl);
                }
            }
            new scale().init();
        }
    })

})(jQuery);;

(function($) {
    class Ruturndata {
        constructor() {
            this.btn = $('.shop-bag a');
            this.arrsid = [];
            this.arrnum = [];
            this.input = $('.buy .num');
            this.num = 0;
            this.btnleft = $('.buy .jian');
            this.btnright = $('.buy .jia');
        }
        init() {
            var _this = this;
            this.btnleft.on('click', function() {
                _this.left();

            })

            this.btnright.on('click', function() {
                _this.right();

            })

            // this.cookietoarray();
            this.btn.on('click', function() {
                _this.btnclick(this)
            })
        }

        // cookietoarray() {
        //     if ($.cookie('cookiesid') && getcookie('cookienum')) { //判断商品是第一次存还是多次存储
        //         arrsid = getcookie('cookiesid').split(','); //cookie商品的sid  
        //         arrnum = getcookie('cookienum').split(','); //cookie商品的num
        //     }
        // }
        left() {
            if (this.num > 0) {
                this.num--;
            }
            this.input.val(this.num)

        }
        right() {
            this.num++;
            this.input.val(this.num)
        }
        btnclick(btn) {
            console.log($(btn))
            var $sid = $(btn).parents('.big-wrapper').find('.spic-pic').attr('sid');
            console.log($sid)
            $.cookie('sid', $sid)

            // cookietoarray(); //获取已经存在的cookie值。

        }

    }
    new Ruturndata().init()
})(jQuery);