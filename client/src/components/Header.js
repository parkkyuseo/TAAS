// src/components/Header.js
import React from 'react';
import '../styles/header.css'; 

function Header({subtitle}) {
  return (
    <header className="header">
      <div className="header-column logo-column">
        <a href="link-1">
          <img src="images/cise.jpeg" alt="Logo 1" className="logo" />
        </a>
      </div>
      <div className="header-column main-column">
        <div className="header-text">
          <div className="header-row row-1">TAAS</div>
          <div className="header-row row-2">{subtitle}</div> 
        </div>
      </div>
      <div className="header-column logo-column">
        <a href="link-2">
          <img src="images/exit.png" alt="Logo 2" className="logo" />
        </a>
      </div>
    </header>
  );
}

export default Header;
