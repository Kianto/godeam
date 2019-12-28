$(document).ready(function () {
    $('#order-form').on('submit', function(e) {
        e.preventDefault();
        var form = $(this);
        var url = form.attr('action');
        
        $.ajax({
            type: 'POST',
            url: url,
            data: $('#order-form').serialize(),
            success: function(data) {
                while ($('.sbmincart-remove').length !== 0) {
                    $('.top_toys_cart').click();
                    $('.sbmincart-remove').each(function() {
                        $(this).trigger("click").delay(100);
                    });
                    $('.sbmincart-closer').click();
                }
                alert('Đơn của bạn đã được đặt thành công. Xin hãy kiểm tra email để xem lại thông tin thanh toán. Xin cảm ơn. Bạn sẽ được điều hướng trở lại trang chủ.');
                window.location.replace('/');
            },
            error: function(error){
                const code =  error.responseJSON.error.code;
                // switch(code) {
                // case 1003:
                //     break;
                // }
                alert('Có lỗi diễn ra trong quá trình xử lý đơn đặt hàng của bạn. Xin hãy thử lại lần sau!');
            }
        })
    });
    
});