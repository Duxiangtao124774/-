;
(function($) {
    // 添加随机四位验证码
    class Code {
        constructor() {
            this.btn = $('.tips a');
            this.code = $('.tips em');
        }
        init() {
            var _this = this;
            this.btn.on('click', function() {
                _this.click()
            })
        }
        click() {
            var str = "qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPLKJHGFDSAZXCVBNM";
            var str1 = '';
            for (var i = 0; i < 4; i++) {
                str1 += str.charAt(Math.floor(Math.random() * 62))
            };
            this.code.html(str1)
        }
    }
    new Code().init();
})(jQuery);;

(function($) {
    $(function() {
        $('#form').validate({
            rules: {
                username: {
                    required: true,
                    minlength: 4,
                    maxlength: 20,
                    remote: { //将前端的name给后端
                        url: "http://10.31.163.147:1247/duxiangtao/-dxt/DUproject/php/reg.php", //后台处理程序
                        type: "post" //数据发送方式
                    }
                },
                tel: {
                    required: true,
                    minlength: 11
                }
            },
            messages: {
                username: {
                    required: '用户名不能为空',
                    minlength: '用户名不能小于4个字符',
                    maxlength: '用户名不能大于20个字符',
                    remote: '用户名已存在'
                },
                tel: {
                    required: '密码不能为空',
                    minlength: '手机号为11位',
                }
            }

        });
    });
    $.validator.setDefaults({
        /*添加校验成功后的执行函数--修改提示内容，并为正确提示信息添加新的样式(默认是valid)*/
        success: function(label) {
            label.text('√').css({
                'color': 'green',
                'fontSize': 16
            }).addClass('valid').addClass('tips');
        }
    });
})(jQuery);