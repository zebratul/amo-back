const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser'); // If you're using Express < 4.16
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allows all origins
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
app.use(express.json()); // For Express 4.16 and above
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Mail.ru',
    auth: {
        user: process.env.MAIL_ACC,
        pass: process.env.MAIL_PASS
    }
});

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/send-email', (req, res) => {
    const { email_user, tel } = req.body;

    const mailOptions = {
        from: 'zeb.ratul@mail.ru', // Sender address
        to: 'fedorovnapelageya+lead@mail.amocrm.ru', // Receiver address
        subject: 'Заявка Таратынов', // Subject
        html: `<p>Email: ${email_user}</p><p>Телефон: ${tel}</p>` // HTML body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
