require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const sendEmail = require('./helpers/mailer');
const createContact = require('./helpers/amoCRM');

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Email recipients
const emailRecipients = [
    "order@salesgenerator.pro",
    "irochkapetrova2003+lead@mail.amocrm.ru",
    "zebratul@gmail.com"
];

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/send-email', async (req, res) => {
    const { email_user, tel } = req.body;

    try {
        await createContact(email_user, tel);
        console.log('Created contact in amoCRM');

        await sendEmail(email_user, tel, emailRecipients);
        res.send('Emails sent and contact created successfully');
    } catch (error) {
        console.error('Failed to process request:', error);
        res.status(500).send('Failed to send emails or create contact');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
