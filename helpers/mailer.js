require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Mail.ru',
    auth: {
        user: process.env.MAIL_ACC,
        pass: process.env.MAIL_PASS
    }
});

async function sendEmail(email_user, tel, recipients) {
    const mailOptions = {
        from: process.env.MAIL_ACC,
        to: recipients.join(', '),
        subject: 'Заявка Таратынов',
        html: `<p>Email: ${email_user}</p><p>Телефон: ${tel}</p>`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

module.exports = sendEmail;
