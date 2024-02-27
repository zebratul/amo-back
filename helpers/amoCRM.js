require('dotenv').config();
const axios = require('axios');

const subdomain = process.env.SUBDOMAIN;
const accessToken = process.env.TOKEN;

async function createContact(email, phone) {
    const url = `https://${subdomain}.amocrm.ru/api/v4/contacts`;

    const contactData = {
        "first_name": "Контакт",
        "last_name": "из API",
        "custom_fields_values": [
            {
                "field_code": "EMAIL",
                "values": [{ "value": email }]
            },
            {
                "field_code": "PHONE", 
                "values": [{ "value": phone }]
            }
        ]
    };

    try {
        const response = await axios.post(url, [contactData], {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('Contact created:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating contact:', error.response ? error.response.data : error.message);
        throw error;
    }
}

module.exports = createContact;
