import React, { useEffect, useRef } from 'react';
import { CountUp } from 'countup.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './about.scss';

function About() {
  const yearsRef = useRef(null);
  const propertiesRef = useRef(null);
  const clientsRef = useRef(null);

  useEffect(() => {
    const yearsCountUp = new CountUp(yearsRef.current, 16, { duration: 2 });
    const propertiesCountUp = new CountUp(propertiesRef.current, 1000, { duration: 2 });
    const clientsCountUp = new CountUp(clientsRef.current, 500, { duration: 2 });

    if (yearsCountUp && propertiesCountUp && clientsCountUp) {
      yearsCountUp.start();
      propertiesCountUp.start();
      clientsCountUp.start();
    } else {
      console.error("Error initializing CountUp");
    }
  }, []);

  return (
    <div className="about-page">
      <div className="hero-section">
        <Carousel showThumbs={false} autoPlay interval={5000} infiniteLoop useKeyboardArrows transitionTime={1000}>
          <div>
            <img src="/bg4.png" alt="About Us" className="hero-image" />
            <div className="overlay">
              <h1 className="title">About Us</h1>
              <p className="subtitle">Your trusted partner in real estate</p>
            </div>
          </div>
          <div>
            <img src="/bg3.png" alt="About Us" className="hero-image" />
            <div className="overlay">
              <h1 className="title">About Us</h1>
              <p className="subtitle">Your trusted partner in real estate</p>
            </div>
          </div>
          <div>
            <img src="/bg2.png" alt="About Us" className="hero-image" />
            <div className="overlay">
              <h1 className="title">About Us</h1>
              <p className="subtitle">Your trusted partner in real estate</p>
            </div>
          </div>
          <div>
            <img src="/bg5.png" alt="About Us" className="hero-image" />
            <div className="overlay">
              <h1 className="title">About Us</h1>
              <p className="subtitle">Your trusted partner in real estate</p>
            </div>
          </div>
        </Carousel>
      </div>
      <div className="about-content">
        <div className="text-container">
          <h2>Our Story</h2>
          <p>With over 16 years of excellence, we have been committed to helping you find the perfect home. Our award-winning services and extensive property listings make us a trusted name in real estate.</p>
          <p>We believe in providing exceptional customer service, and our team of experts is dedicated to making your home buying or selling experience as smooth as possible.</p>
          <div className="call-to-action">
            <div className="contact-icons">
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} className="icon" />
              </a>
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} className="icon" />
              </a>
              <a href="mailto:info@example.com">
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} className="icon" />
              </a>
              <a href="tel:+1234567890">
                <FontAwesomeIcon icon={faPhone} className="icon" />
              </a>
            </div>
          </div>
        </div>
        <div className="stats-container">
          <div className="stat">
            <h3 ref={yearsRef}>16+</h3>
            <p>Years of Experience</p>
          </div>
          <div className="stat">
            <h3 ref={propertiesRef}>1000+/</h3>
            <p>Properties Sold</p>
          </div>
          <div className="stat">
            <h3 ref={clientsRef}>500+/</h3>
            <p>Happy Clients</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
