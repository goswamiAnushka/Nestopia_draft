import React from 'react';
import './contact.scss';

function Contact() {
  return (
    <div className="contact">
      <div className="textContainer">
        <h1>Contact Us</h1>
        <p>If you have any questions or need assistance, feel free to reach out to us. Our team is here to help you with all your real estate needs.</p>
        <form className="contactForm">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message"></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/contact-image.jpg" alt="Contact Us" />
      </div>
    </div>
  );
}

export default Contact;
