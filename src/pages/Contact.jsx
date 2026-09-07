import { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact Form Data:");
    console.log(contact);

    alert("Message Sent Successfully!");

    setContact({
      username: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="contact-section">
      <div className="contact-container">

        {/* Left Side */}
        <div className="contact-info">
          <h1>Get In Touch</h1>

          <p>
            Have a question or want to work together?
            Feel free to contact us.
          </p>

          <div className="contact-details">
            <div className="contact-item">
              <h3>Address</h3>
              <p>123 Main Street, Karachi, Pakistan</p>
            </div>

            <div className="contact-item">
              <h3>Email</h3>
              <p>example@gmail.com</p>
            </div>

            <div className="contact-item">
              <h3>Phone</h3>
              <p>+92 300 1234567</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="contact-form-container">
          <h2>Contact Form</h2>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="username">
                Username
              </label>

              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your name"
                value={contact.username}
                onChange={handleInput}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email
              </label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={contact.email}
                onChange={handleInput}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">
                Subject
              </label>

              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Enter subject"
                value={contact.subject}
                onChange={handleInput}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">
                Message
              </label>

              <textarea
                id="message"
                name="message"
                placeholder="Write your message..."
                rows="6"
                value={contact.message}
                onChange={handleInput}
                required
              ></textarea>
            </div>

            <button type="submit">
              Send Message
            </button>

          </form>
        </div>

      </div>

      {/* Google Map */}
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps?q=Karachi,Pakistan&output=embed"
          width="100%"
          height="400"
          style={{ border: 0 }}
          loading="lazy"
          title="Google Map"
        ></iframe>
      </div>
    </section>
  );
};

export default Contact;