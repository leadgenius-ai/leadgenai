import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MobileNav.css';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mobile-nav">
      <button className="hamburger" onClick={toggleMenu}>
        <span className={`hamburger-icon ${isOpen ? 'open' : ''}`}></span>
      </button>
      
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <Link to="/" onClick={toggleMenu}>Home</Link>
        <Link to="/dashboard" onClick={toggleMenu}>Dashboard</Link>
        <Link to="/data-collection" onClick={toggleMenu}>Data Collection</Link>
        <Link to="/case-studies" onClick={toggleMenu}>Case Studies</Link>
        <Link to="/contact" onClick={toggleMenu}>Contact</Link>
      </div>
    </div>
  );
};

export default MobileNav; 