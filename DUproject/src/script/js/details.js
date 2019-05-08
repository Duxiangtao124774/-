;
(function($) {

    class scale {
        constructor() {
            this.wrap = $('.content');
            this.spic = $('.spic');
            this.bpic = $('.bpic');
            this.sf = $('.sf');
            this.bf = $('.bf');
            this.list = $('.smallpic li');
            this.ul = $('.smallpic ul');
        }
        init() {
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
            this.sf.width(this.spic.width() * this.bf.width() / this.bpic.width());
            this.sf.height(this.spic.height() * this.bf.height() / this.bpic.height());
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
            let l = e.pageX - this.wrap.offset().left - this.sf.width() / 2;
            let t = e.pageY - this.wrap.offset().top - this.sf.height() / 2;
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
})(jQuery);