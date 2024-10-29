import React from "react";
import { Link } from "react-router-dom";
import './style.css';  // Link to your CSS file

function WelcomePage() {
    return (
        <div>
            {/* Header Section */}
            <header className="header">
                <div className="header-column logo-column">
                    <a href="link-1">
                        <img src="images/cise.jpeg" alt="Logo 1" className="logo" />
                    </a>
                </div>
                <div className="header-column main-column">
                    <div className="header-text">
                        <div className="header-row row-1">TAAS</div>
                        <div className="header-row row-2">Landing Page</div>
                    </div>
                </div>
                <div className="header-column logo-column">
                    <a href="link-2">
                        <img src="images/exit.png" alt="Logo 2" className="logo" />
                    </a>
                </div>
            </header>

            {/* Block Section */}
            <section className="block">
                <img src="images/lesson.png" alt="Main Logo" className="main-logo" />
                <h1 className="block-heading">Welcome to TAAS</h1>
                <h2 className="block-subheading">Please login to continue</h2>
                <h3 className="block-description">See Canvas for login information</h3>
                <Link to="/login">
                    <button className="login-button">Login</button>
                </Link>
            </section>

            {/* Footer Section */}
            <footer className="footer">
                <a href="footer-link">
                    <img src="images/ufLogo.png" alt="Footer Logo" className="footer-logo" />
                </a>
            </footer>
        </div>
    );
}

export default WelcomePage;