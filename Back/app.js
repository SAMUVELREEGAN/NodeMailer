const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to send emails
app.post("/send-email", async (req, res) => {
  const { userEmail, subject, message } = req.body;  // userEmail from the form

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // Gmail service
      auth: {
        user: "samuelreegan372@gmail.com", // Your email address
        pass: "rfiu cbsp pznl styi", // Your Gmail App Password
      },
    });

    // Email options
    const mailOptions = {
      from: userEmail, // Email provided by the user
      to: "samuelreegan372@gmail.com", // Your email address (recipient)
      subject: subject,                  // User-specified subject
      text: `Message from ${userEmail}:\n\n${message}`, // The user's message
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully to your inbox!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending email");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
