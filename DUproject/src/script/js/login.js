;
(function($) {
    $('.btn').on('click', function() {
        var $username = $('#username').val();
        var $tel = $('#tel').val();
        $.ajax({
            type: 'post',
            url: 'http://10.31.163.147:1247/duxiangtao/-dxt/DUproject/php/login.php',
            data: { //将用户名和密码传输给后端
                name: $username,
                tel: $tel
            },
            success: function(data) { //请求成功，接收后端返回的值
                if (!data) { //用户名或者手机号错误
                    $('.err').show().html('用户名或者手机号错误');
                    $('#tel').val('');
                } else { //成功,存cookie,跳转到首页
                    $.cookie('UserName', $username, {
                        expires: 7
                    });
                    location.href = 'http://10.31.163.147:1247/duxiangtao/-dxt/DUproject/src/index1.html';
                }
            }
        })
    });
})(jQuery);