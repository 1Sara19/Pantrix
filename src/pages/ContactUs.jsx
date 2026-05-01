import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, Send, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import "../styles/pages/ContactUs.css";
import { submitContactReport } from "../services/contactService";

function ContactUs() {
  const navigate = useNavigate();

  const [user] = useState({
    email: "s@gmail.com",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject || !message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      await submitContactReport({
        email: user.email,
        subject,
        message,
      });

      toast.success("Message sent successfully!");
      setSubject("");
      setMessage("");
    } catch (error) {
      toast.error(error.message || "Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page-wrapper">
      <section className="contact-content-section">
        <div className="container contact-page">
          <button
            className="btn btn-ghost back-btn"
            onClick={() => navigate("/")}
            type="button"
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>

          <div className="contact-header">
            <div className="contact-title-wrap">
              <div className="contact-icon-box">
                <Mail size={28} />
              </div>

              <div>
                <h1>Contact Us</h1>
                <p className="contact-subtitle">
                  Send us feedback or report an issue
                </p>
              </div>
            </div>
          </div>

          <div className="card contact-card">
            <div className="contact-card-header">
              <h2>Get in Touch</h2>
              <p>
                We'd love to hear from you! Whether you have feedback, found a
                bug, or just want to say hello.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label>Your Email</label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="input contact-input contact-readonly"
                />
                <small>We'll respond to this email address</small>
              </div>

              <div className="form-group select-wrap">
                <label>Subject</label>
                <select
                  className="input select contact-input contact-select"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="">Select a subject</option>
                  <option value="feedback">Feedback</option>
                  <option value="problem">Report a problem</option>
                  <option value="feature">Feature request</option>
                  <option value="other">Other</option>
                </select>
                <ChevronDown size={18} className="select-icon" />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  className="input textarea contact-textarea"
                  placeholder="Tell us what's on your mind..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary contact-submit-btn"
              >
                <Send size={18} />
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          <div className="contact-demo-card">
            <div className="card contact-demo-card">
              <h3>Demo Application</h3>
              <p>
                This is a demonstration app. In a real application, your message
                would be sent to our support team. For now, messages are
                simulated locally.
              </p>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}

export default ContactUs;