import { useState } from "react";
import "../styles/theme.css";

function ContactUs() {
  const [formData, setFormData] = useState({
    subject: "",
    email: "",
    message: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.subject || !formData.email || !formData.message) {
      setMessage("Please fill in all fields.");
      return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    if (!emailValid) {
      setMessage("Please enter a valid email.");
      return;
    }

    setMessage("Your message has been sent successfully!");
    setFormData({
      subject: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="container container-sm mt-lg">
      <h1 className="mb-sm">Contact Us</h1>
      <p className="text-muted mb-lg">
        Send us your feedback or report an issue.
      </p>

      {message && <div className="alert alert-success mb-md">{message}</div>}

      <form onSubmit={handleSubmit} className="card">
        <div className="mb-md">
          <label>Subject</label>
          <input
            className="input"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter subject"
          />
        </div>

        <div className="mb-md">
          <label>Email</label>
          <input
            className="input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-md">
          <label>Message</label>
          <textarea
            className="input textarea"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message..."
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContactUs;