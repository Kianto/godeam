var nodemailer = require('nodemailer');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const getTransporter = () => {
	return nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: true,
        auth: {
            user: 'ttsgroup4@gmail.com',
            pass: 'texttospeech'
        }
    });
};

exports.sendForgotPasswordMail = (email) => {
    var mail = {
        from: 'ttsgroup4@gmail.com',
        to: email,
        subject: 'New message from KatJob',
        text: 'You recieved message from ' + req.query.email,
        html: '<p>You have got a new message</b>' + '<ul><li>Name: ' + req.query.name + '</li><li>Email: ' + req.query.email + '</li><li>Phone: ' + req.query.phone + '</li><li>Message: ' + req.query.message + '</li></ul>'
    };
    
    transporter.sendMail(mail, function (error, info) {
        if (error) {
            console.log(error);
            res.json(false);
        } else {
            res.json(true);
        }
    });  

    return false;
};

exports.sendOrderConfirmMail = async (email) => {
    let mail = {
        from: 'ttsgroup4@gmail.com',
        to: email,
        subject: 'GoDeam: Kiểm tra đơn đặt hàng của bạn',
        html: '<p>You have got a new message</b>'
	};
	
	let resp=false;
	await getTransporter().sendMail(mail, function(error, info){
		if (error) {
			console.log("MAILER error: " + error);
			resp =false;
		} else {
			console.log('MAILER sent: ' + info.response);
			resp=true;
		}
	});
    return resp;
};
