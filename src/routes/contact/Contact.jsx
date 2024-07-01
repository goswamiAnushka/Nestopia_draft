import React from 'react';
import { FiUser, FiMail } from 'react-icons/fi'; // Import icons from react-icons
import './contact.scss';

const Contact = () => {
  return (
    <div className="container">
      <form>
        <h1 className="title">Talk to Us</h1>

        {/* Name */}
        <div className="form-group">
          <label htmlFor="formName">
            <FiUser className="icon" />
          </label>
          <input type="text" id="formName" className="form-control form-control-lg thick" placeholder="Name" />
        </div>

        {/* E-mail */}
        <div className="form-group">
          <label htmlFor="formEmail">
            <FiMail className="icon" />
          </label>
          <input type="email" id="formEmail" className="form-control form-control-lg thick" placeholder="E-mail" />
        </div>

        {/* Message */}
        <div className="form-group message">
          <textarea id="formMessage" className="form-control form-control-lg" rows="7" placeholder="Message"></textarea>
        </div>

        {/* Submit btn */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Send message
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
