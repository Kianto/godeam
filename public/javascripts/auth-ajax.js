$(document).ready(function () {
$('#register-email').keyup(function() {
    $.getJSON('/checkEmailExisting?email='+$('#register-email').val(), function (data){
      if (data) {
        $('#register-error-message').html('Email này đã được đăng ký. Bạn có muốn chuyển sang đăng nhập?');
        $('#register-btn').attr('disabled', true);
        $('#register-btn').css('text-decoration', 'line-through');
      } else {
        $('#register-error-message').html('');
        $('#register-btn').attr('disabled', false);
        $('#register-btn').css('text-decoration', 'none');
      }
    })
});

$('#register-repass').keyup(function() {
    $('#register-error-message').html($('#register-repass').val());
    if ( $('#register-repass').val() !== $('#register-pass').val() ) {
      $('#register-error-message').html('Mật khẩu nhập lại chưa khớp!');
      $('#register-btn').attr('disabled', true);
      $('#register-btn').css('text-decoration', 'line-through');
    }
    else {
      $('#register-error-message').html('');
      $('#register-btn').attr('disabled', false);
      $('#register-btn').css('text-decoration', 'none');
    }
});

$('#register-form').on('submit', function(e) {
    e.preventDefault();
    var form = $(this);
    var url = form.attr('action');
    
    $.ajax({
        type: 'POST',
        url: url,
        data: $('#register-form').serialize(),
        success: function(data) {
            const user = data.data;
            window.location.replace('/?name=' + user.name + '&token=' + user.token + '&email=' + user.email);
            location.href = location;
        },
        error: function(error){
            const code =  error.responseJSON.error.code;
            switch(code) {
            case 1003:
                $('#register-error-message').html('Thông tin đăng ký chưa đúng!');
                break;
            case 1002:
                $('#register-error-message').html('Hệ thống không lấy được token!');
                break;
            }
        }
    })
});

$('#login-form').on('submit', function(e) {
    e.preventDefault();
    var form = $(this);
    var url = form.attr('action');
    
    $.ajax({
        type: 'POST',
        url: url,
        data: $('#login-form').serialize(),
        success: function(data) {
            const user = data.data;
            window.location.replace('/?name=' + user.name + '&token=' + user.token + '&email=' + user.email);
            
            var pathname = window.location.pathname;
            if (pathname.includes("checkout")) 
                $('.sbmincart-submit').click();
            else
                location.href = location;
        },
        error: function(error){
            const code =  error.responseJSON.error.code;
            switch(code) {
            case 1001:
                $('#login-error-message').html('Email hoặc mật khẩu đã nhập không khớp!');
                break;
            case 1002:
                $('#login-error-message').html('Hệ thống không lấy được token!');
                break;
            }
        }
    })
});

$('#logout-btn').on('click', function(e) {
    $.get('/logout').done(() => {
        if (pathname.includes("payment")) 
            window.location.replace('/');
        else
            location.href = location;
    });
});

$('#changepass-repass').keyup(function() {
    $('#changepass-error-message').html($('#changepass-repass').val());
    if ( $('#changepass-repass').val() !== $('#changepass-pass').val() ) {
      $('#changepass-error-message').html('Mật khẩu nhập lại chưa khớp!');
      $('#changepass-btn').attr('disabled', true);
      $('#changepass-btn').css('text-decoration', 'line-through');
    }
    else {
      $('#changepass-error-message').html('');
      $('#changepass-btn').attr('disabled', false);
      $('#changepass-btn').css('text-decoration', 'none');
    }
});

$('#changepass-form').on('submit', function(e) {
    e.preventDefault();
    var form = $(this);
    var url = form.attr('action');
    
    $.ajax({
        type: 'POST',
        url: url,
        data: $('#changepass-form').serialize(),
        success: function(data) {
            alert('Mật khẩu mới của bạn đã được cập nhật!');
            window.location.reload();
        },
        error: function(error){
            const code =  error.responseJSON.error.code;
            switch(code) {
            case 1003:
                $('#register-error-message').html('Mật khẩu không đúng quy định!');
                break;
            case 1005:
                $('#changepass-error-message').html('Hệ thống tạm thời không xử lý được!');
                break;
            }
        }
    })
});


$('#changeinfo-form').on('submit', function(e) {
    e.preventDefault();
    var form = $(this);
    var url = form.attr('action');
    
    $.ajax({
        type: 'POST',
        url: url,
        data: $('#changeinfo-form').serialize(),
        success: function(data) {
            alert('Thông tin của bạn đã được cập nhật!');
            window.location.reload();
        },
        error: function(error){
            const code =  error.responseJSON.error.code;
            switch(code) {
            case 1003:
                $('#changeinfo-error-message').html('Thông tin không đúng quy định!');
                break;
            case 1005:
                $('#changeinfo-error-message').html('Hệ thống tạm thời không xử lý được!');
                break;
            }
        }
    })
});

});