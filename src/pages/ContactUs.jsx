import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, Send } from "lucide-react";
import "../styles/contact.css";

function ContactUs() {
  const navigate = useNavigate();

  const [user] = useState({
    email: "sarah@example.com",
  });

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!subject || !message.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      alert("Message sent successfully!");
      setSubject("");
      setMessage("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container container-sm contact-page">
      <button
        className="btn btn-ghost back-btn"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={18} />
        Back to Home
      </button>

      <div className="contact-header">
        <div className="contact-title-wrap">
          <div className="contact-icon-box">
            <Mail size={24} />
          </div>

          <div>
            <h1>Contact Us</h1>
            <p className="text-muted">
              Send us feedback or report an issue
            </p>
          </div>
        </div>
      </div>

      <div className="card contact-card">
        <div className="card-header">
          <h2 className="card-title">Get in Touch</h2>
          <p className="card-description">
            We'd love to hear from you! Whether you have feedback or found a bug.
          </p>
        </div>

        <div className="card-content">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label>Your Email</label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="input contact-readonly"
              />
              <small>We'll respond to this email</small>
            </div>

            <div className="form-group">
              <label>Subject</label>
              <select
                className="input select"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="">Select a subject</option>
                <option value="feedback">Feedback</option>
                <option value="problem">Report a problem</option>
                <option value="feature">Feature request</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                className="input textarea"
                placeholder="Tell us what's on your mind..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full"
            >
              <Send size={16} />
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      <div className="card contact-info">
        <div className="card-content">
          <div className="contact-info-content">
            <h3>Demo Application</h3>
            <p className="text-muted">
              This is a demo app. Messages are simulated locally.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;