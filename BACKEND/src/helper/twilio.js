const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
const client = require('twilio')(accountSid, authToken);

// Function to send WhatsApp message
function sendWhatsAppMessage(to, message) {
    client.messages
      .create({
         from: 'whatsapp:YOUR_TWILIO_WHATSAPP_NUMBER', // Twilio WhatsApp number
         body: message,
         to: `whatsapp:${to}`
       })
      .then(message => console.log(message.sid))
      .catch(error => console.log(error));
}

// Example usage
const to = 'RECIPIENT_PHONE_NUMBER'; // WhatsApp phone number with country code
const message = 'Hello from Twilio!';

sendWhatsAppMessage(to, message);
