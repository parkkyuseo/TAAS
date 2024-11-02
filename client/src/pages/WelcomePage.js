import React from "react";
import { Link } from "react-router-dom";
import '../styles/style.css';  
import Header from '../components/Header'
import Footer from '../components/Footer'

function WelcomePage() {
    return (
        <div>
            <Header subtitle="Landing Page" />  {/* Header component included here */}

            {/* Block */}
            <section className="block">
                <img src="images/lesson.png" alt="Main Logo" className="main-logo" />
                <h1 className="block-heading">Welcome to TAAS</h1>
                <h2 className="block-subheading">Please login to continue</h2>
                <h3 className="block-description">See Canvas for login information</h3>
                <Link to="/login">
                    <button className="login-button">continue</button>
                </Link>
            </section>

            {/* Footer */}
            <Footer />  {/* Footer component included here */}
        </div>
    );
}

export default WelcomePage;