var nodemailer = require('nodemailer');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const getTransporter = () => {
	return nodemailer.createTransport({
		service: 'Gmail',
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		auth: {
			user: 'godeamshop@gmail.com',
			pass: 'aaaa1111AA'
		}
	});
};

exports.sendForgotPasswordMail = async (email, password) => {
	var mail = {
		from: 'godeamshop@gmail.com',
		to: email,
		subject: 'GoDeam: Lấy mật khẩu mới',
		text: 'Bạn vừa gửi yêu cầu thay đổi mật khẩu.',
		html:
			'<p>Chào bạn</p>' +
			'<p>Bạn hoặc một ai đó vừa gửi yêu cầu thay đổi mật khẩu từ hệ thống website của GoDeam Toy World. Vui lòng đăng nhập mới mật khẩu tạm thời sau: </p>' +
			'<p><b>' +
			password +
			'</b></p>' +
			'<b>Lưu ý:</b> <i>Nếu bạn không thực hiện yêu cầu này, thì bạn có thể yên tâm bỏ qua!</i>' +
			'<br>' +
			'<p>Trân trọng</p>' +
			'<p>TTS</p>'
	};

	let resp = false;
	await getTransporter().sendMail(mail, function(error, info) {
		if (error) {
			console.log('MAILER error: ' + error);
			resp = false;
		} else {
			console.log('MAILER sent: ' + info.response);
			resp = true;
		}
	});
	return resp;
};

exports.sendOrderConfirmMail = async (email, order) => {
	let mail = {
		from: 'godeamshop@gmail.com',
		to: email,
		subject: 'GoDeam: Kiểm tra đơn đặt hàng của bạn',
		text: 'Bạn vừa đặt hàng từ chúng tôi. Chi tiết giỏ hàng của bạn là: ',
		html: '<p>You have got a new message</p>'
	};

	let resp = false;
	await getTransporter().sendMail(mail, function(error, info) {
		if (error) {
			console.log('MAILER error: ' + error);
			resp = false;
		} else {
			console.log('MAILER sent: ' + info.response);
			resp = true;
		}
	});
	return resp;
};
