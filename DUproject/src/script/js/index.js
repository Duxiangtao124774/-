; //轮播图效果
(function($) {
    class Banner {
        constructor() {
            this.banner = $('#banner');
            this.picLi = $('.banner-box .banner-pic li');
            this.btnLi = $('.pic-content ul li');
            this.btn_right = $('#banner .right');
            this.time = null;
            this.num = 0;
        }
        init() {
            var _this = this;
            this.btnLi.each(function() {
                $(this).on('mouseover', function() {
                    _this.btnliover(this)
                })
            })
            this.btn_right.on('click', function() {
                _this.rightclick()
            })

            // 刷新就可以让轮播图自动轮播
            this.timer = setInterval(function() {
                _this.btn_right.click()
            }, 2000);

            this.banner.hover(function() {
                _this.arrowover()
            }, function() {
                _this.arrowout()
            })
        }
        btnliover(bli) {
            this.num = $(bli).index()
            $(bli).stop(true).animate({
                opacity: 1
            }).siblings('li').stop(true).animate({
                opacity: 0.6
            });
            this.picLi.eq($(bli).index()).show().siblings('li').hide()

        }
        arrowover() {
            clearInterval(this.timer)
        }
        arrowout() {
            var _this = this
            this.timer = setInterval(function() {
                _this.btn_right.click()
            }, 2000);
        }
        rightclick() {
            this.num++;
            if (this.num > this.btnLi.size() - 1) {
                this.num = 0;
            }
            this.btnLi.eq(this.num).stop(true).animate({
                opacity: 1
            }).siblings('li').stop(true).animate({
                opacity: 0.6
            });
            this.picLi.eq(this.num).show().siblings('li').hide()

        }
    }
    new Banner().init()
})(jQuery);

; // 滑过图片颜色变淡效果
(function($) {
    var $allImg = $('img')
    $allImg.hover(function() {
        $(this).stop(true).animate({
            opacity: 0.8
        })
    }, function() {
        $(this).stop(true).animate({
            opacity: 1
        })
    })
})(jQuery);


; // 回到顶部
(function($) {
    var $top = $('#sidebar_b .returntop')
    $top.on('click', function() {
        $('html,body').animate({
            scrollTop: 0
        })
    })
})(jQuery);

// ajax传输数据到首页渲染图片
;
(function($) {
    $.ajax({
        url: 'http://10.31.163.147:1247/duxiangtao/-dxt/DUproject/php/data.php',
        dataType: 'json',
        success: function(data) {
            var $htmlStr = '';
            $.each(data, function(index, value) {
                $htmlStr += `
                <li>
                <div class="pic">
                    <a href="http://10.31.163.147:1247/duxiangtao/-dxt/DUproject/src/details.html?sid=${value.sid}" target="_blank">
                        <img src="${value.indexpic}" alt="">
                    </a>
                </div>
                <div class="word">

                    <a href="http://10.31.163.147:1247/duxiangtao/-dxt/DUproject/src/details.html?sid=${value.sid}" class="name" target="_blank">
                    ${value.name}
                            </a>
                    <span class="discrip">
                    <a href="http://10.31.163.147:1247/duxiangtao/-dxt/DUproject/src/details.html?sid=${value.sid}"  target="_blank">
                    ${value.discrip}
                    </a>
                    </span>
                    <p class="price"><b>￥${value.price}</b></p>
                </div>
            </li> `
                $('.third-content .shop').html($htmlStr)
                var $allImg = $('img')
                $allImg.hover(function() {
                    $(this).stop(true).animate({
                        opacity: 0.8
                    })
                }, function() {
                    $(this).stop(true).animate({
                        opacity: 1
                    })
                })
            })
        }
    })

    $.ajax({
        url: 'http://10.31.163.147:1247/duxiangtao/-dxt/DUproject/php/data2.php',
        dataType: 'json',
        success: function(data) {
            var $htmlStr = '';
            $.each(data, function(index, value) {

                $htmlStr += `
                    <a href="#">
                        <img src="${value.indexpic}" alt="">
                    </a> `
                $('.man-clothes .big-pic').append($htmlStr)
                var $allImg = $('img')
                $allImg.hover(function() {
                    $(this).stop(true).animate({
                        opacity: 0.8
                    })
                }, function() {
                    $(this).stop(true).animate({
                        opacity: 1
                    })
                })
            })
        }
    })
    $.ajax({
        url: 'http://10.31.163.147:1247/duxiangtao/-dxt/DUproject/php/data1.php',
        dataType: 'json',
        success: function(data) {
            var $htmlStr = '';
            $.each(data, function(index, value) {

                $htmlStr += `
                <li>
                <div class="pic">
                    <a href="http://10.31.163.147:1247/duxiangtao/-dxt/DUproject/src/details.html?sid=${value.sid}" target="_blank">
                        <img src="${value.indexpic}" alt="">
                    </a>
                </div>
                <div class="word">

                    <a href="http://10.31.163.147:1247/duxiangtao/-dxt/DUproject/src/details.html?sid=${value.sid}" class="name" target="_blank">
                    ${value.name}
                            </a>
                    <span class="discrip">
                    <a href="http://10.31.163.147:1247/duxiangtao/-dxt/DUproject/src/details.html?sid=${value.sid}"  target="_blank">
                    ${value.discrip}
                    </a>
                    </span>
                    <p class="price"><b>￥${value.price}</b></p>
                </div>
            </li> `
                $('.man-clothes .big-pic').after($htmlStr)
                var $allImg = $('img')
                $allImg.hover(function() {
                    $(this).stop(true).animate({
                        opacity: 0.8
                    })
                }, function() {
                    $(this).stop(true).animate({
                        opacity: 1
                    })
                })
            })
        }
    })



})(jQuery)