import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/header.css'; 

function Header({ subtitle }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    localStorage.removeItem("user_role"); 
    
    // Redirect to the welcome page
    navigate("/");
  };

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
        <button onClick={handleLogout} className="logout-button">
          <img src="images/exit.png" alt="Logout" className="logo" />
        </button>
      </div>
    </header>
  );
}

export default Header;