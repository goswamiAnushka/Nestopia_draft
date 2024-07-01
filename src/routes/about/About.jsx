import React from 'eact';
import './about.scss';

function About() {
  return (
    <div className="about-page">
      <div className="hero-section">
        <div className="overlay">
          <h1 className="title">About Us</h1>
          <p className="subtitle">Your trusted partner in real estate</p>
        </div>
        <img src="/about-image.jpg" alt="About Us" className="hero-image" />
      </div>
      <div className="about-content">
        <div className="text-container">
          <h2>Our Story</h2>
          <p>With over 16 years of excellence, we have been committed to helping you find the perfect home. Our award-winning services and extensive property listings make us a trusted name in real estate.</p>
          <p>We believe in providing exceptional customer service, and our team of experts is dedicated to making your home buying or selling experience as smooth as possible.</p>
        </div>
        <div className="stats-container">
          <div className="stat">
            <h3>16+</h3>
            <p>Years of Experience</p>
          </div>
          <div className="stat">
            <h3>1000+</h3>
            <p>Properties Sold</p>
          </div>
          <div className="stat">
            <h3>500+</h3>
            <p>Happy Clients</p>
          </div>
        </div>
      </div>
      <div className="call-to-action">
        <button className="btn">Contact Us</button>
      </div>
    </div>
  );
}

export default About;