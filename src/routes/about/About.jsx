import React from 'react';
import './about.scss';

function About() {
  return (
    <div className="about">
      <div className="textContainer">
        <h1>About Us</h1>
        <p>With over 16 years of excellence, we have been committed to helping you find the perfect home. Our award-winning services and extensive property listings make us a trusted name in real estate.</p>
      </div>
      <div className="imgContainer">
        <img src="/about-image.jpg" alt="About Us" />
      </div>
    </div>
  );
}

export default About;
