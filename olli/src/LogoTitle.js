import React from 'react';
import './style.css'; // Importing the CSS file for styles
import logo from './ollitransparent.png'; // Make sure the path to your logo is correct

const LogoTitle = () => {
  return (
    <div className="logo-title-container">
      <img src={logo} alt="Logo" className="logo-fall" />
      <h1 className="title-fall">Ongoing Living and Learning Inc.</h1>
    </div>
  );
};

export default LogoTitle;