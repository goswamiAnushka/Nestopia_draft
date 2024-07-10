import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './agents.scss';

function Agents() {
  return (
    <div className="agents">
      <div className="textContainer">
        <h1>Our Agents</h1>
        <p>Meet our team of professional and experienced real estate agents dedicated to helping you find the perfect home.</p>
        <div className="agentList">
          <div className="agent">
            <img src="public/ANU PIC.jpeg" alt="Agent 1" />
            <h2>Anushka Goswami</h2>
            <p>Senior Agent</p>
            <div className="contact">
              <a href="tel:+1234567890" className="contact-link">
                <FontAwesomeIcon icon={faPhone} />
              </a>
              <a href="mailto:anu@example.com" className="contact-link">
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </div>
          </div>
          <div className="agent">
            <img src="/soumya.jpeg" alt="Agent 2" />
            <h2>Soumya Chakraborty</h2>
            <p>Agent</p>
            <div className="contact">
              <a href="tel:+1234567890" className="contact-link">
                <FontAwesomeIcon icon={faPhone} />
              </a>
              <a href="mailto:chakra@example.com" className="contact-link">
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agents;
