import { useState } from "react";
import Menu from "../components/Menu";
import "../styles/theme.css";
import "../styles/contact-us.css";

function ContactUs({ setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "sarah.alsa@gmail.com",
    subject: "",
    message: "",
  });

  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setStatusMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setStatusMessage("Please fill in all fields.");
      return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    if (!emailValid) {
      setStatusMessage("Please enter a valid email address.");
      return;
    }

    setStatusMessage("Your message has been sent successfully!");
    setFormData((prev) => ({
      ...prev,
      subject: "",
      message: "",
    }));
  };

  return (
    <div className="contact-page">
      <header className="contact-header">
        <div className="contact-brand">
          <button
            type="button"
            className="contact-icon-btn"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>

          <div>
            <h3 className="contact-brand-title">Pantrix</h3>
            <p className="contact-brand-subtitle">Cook Smart, Waste Less</p>
          </div>
        </div>

        <button
          type="button"
          className="contact-icon-btn contact-logout-btn"
          aria-label="Logout"
        >
          ↪
        </button>
      </header>

      <main className="contact-content">
        <button
          type="button"
          className="contact-back-link"
          onClick={() => setPage && setPage("home")}
        >
          ← Back to Home
        </button>

        <div className="contact-title-wrap">
          <div className="contact-title-icon">✉️</div>
          <div>
            <h1>Contact Us</h1>
            <p className="contact-subtitle">Send us feedback or report an issue</p>
          </div>
        </div>

        {statusMessage && (
          <div
            className={`alert ${
              statusMessage.includes("successfully") ? "alert-success" : "alert-error"
            } contact-alert`}
          >
            {statusMessage}
          </div>
        )}

        <section className="contact-card">
          <h3>Get In Touch</h3>
          <p className="contact-card-text">
            We&apos;d love to hear from you! Whether you have feedback, found a
            bug, or just want to say hello.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="contact-field">
              <label htmlFor="email">Your Email</label>
              <input
                id="email"
                className="input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <small>We&apos;ll respond to this email address</small>
            </div>

            <div className="contact-field">
              <label htmlFor="subject">Subject</label>
              <select
                id="subject"
                className="input select"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              >
                <option value="">Select a subject</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Feedback">Feedback</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="contact-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                className="input textarea contact-textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us what's on your mind..."
              />
            </div>

            <button type="submit" className="btn btn-primary contact-submit-btn">
              ✈ <span>Send Message</span>
            </button>
          </form>
        </section>

        <section className="contact-info-card">
          <h3>Demo Application</h3>
          <p>
            This is a demonstration app. In a real application, your message
            would be sent to our support team. For now, messages are simulated
            locally.
          </p>
        </section>
      </main>

      <footer className="contact-footer">
        <p>© 2026 Pantrix - Helping you cook smart and reduce food waste</p>
        <small>Demo prototype - All data is simulated</small>
      </footer>

      <Menu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeItem="contact"
        setPage={setPage}
      />
    </div>
  );
}

export default ContactUs;