import React, { useState } from "react";
import axios from "axios";

const EmailForm = () => {
  const [formData, setFormData] = useState({
    userEmail: "",  // Make sure userEmail is set correctly
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending form data to the backend
      await axios.post("http://localhost:5000/send-email", formData);
      alert("Email sent successfully!");
      setFormData({ userEmail: "", subject: "", message: "" });
    } catch (error) {
      console.error(error);
      alert("Error sending email");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Your Email:</label>
        <input
          type="email"
          name="userEmail"
          value={formData.userEmail}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Subject:</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Message:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Send Email</button>
    </form>
  );
};

export default EmailForm;
