const express = require('express');
const path = require('path');
const SibApiV3Sdk = require('@sendinblue/client');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Serve static files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Name, email, and message are required'
    });
  }

  try {
    // Initialize Brevo API client
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    apiInstance.setApiKey(
      SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    // Prepare email
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = "New Contact Form Submission from KONGO'S Website";
    sendSmtpEmail.htmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <hr>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </body>
      </html>
    `;
    sendSmtpEmail.sender = {
      name: "KONGO'S Website",
      email: process.env.SENDER_EMAIL || "noreply@yourdomain.com"
    };
    sendSmtpEmail.to = [
      { email: process.env.RECIPIENT_EMAIL || "nexgenfec@gmail.com" }
    ];
    sendSmtpEmail.replyTo = { email: email, name: name };

    // Send email via Brevo
    await apiInstance.sendTransacEmail(sendSmtpEmail);

    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again later.'
    });
  }
});

// Reservation form endpoint (if needed)
app.post('/api/reservation', async (req, res) => {
  const { name, email, phone, date, time, guests, occasion } = req.body;

  if (!name || !email || !phone || !date || !time || !guests) {
    return res.status(400).json({
      success: false,
      error: 'All fields are required'
    });
  }

  try {
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    apiInstance.setApiKey(
      SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = "New Reservation Request from KONGO'S Website";
    sendSmtpEmail.htmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>New Reservation Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Number of Guests:</strong> ${guests}</p>
          <p><strong>Special Occasion:</strong> ${occasion || 'None'}</p>
        </body>
      </html>
    `;
    sendSmtpEmail.sender = {
      name: "KONGO'S Website",
      email: process.env.SENDER_EMAIL || "noreply@yourdomain.com"
    };
    sendSmtpEmail.to = [
      { email: process.env.RECIPIENT_EMAIL || "nexgenfec@gmail.com" }
    ];
    sendSmtpEmail.replyTo = { email: email, name: name };

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    res.json({ success: true, message: 'Reservation request sent successfully' });
  } catch (error) {
    console.error('Error sending reservation:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send reservation. Please try again later.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
