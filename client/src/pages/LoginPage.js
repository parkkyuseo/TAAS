import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/login.css';


function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Function to handle login and fetch JWT token
  const handleLogin = async () => {
    const response = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, password }),
    });
    
    const data = await response.json();

    if (response.ok) {
      setToken(data.access_token);  // Store the JWT token if login is successful
      setMessage("Logged in successfully");
      // Store user_id and token in localStorage after login
      localStorage.setItem("user_id", id); 
      localStorage.setItem("token", data.access_token);
      navigate("/application-homepage"); 
    } else {
      setToken(null);
      setMessage("");
      setError("Incorrect Password or ID");
    }
  };

  // Example of sending a request with the token
  const fetchProtectedData = async () => {
    const response = await fetch("http://127.0.0.1:5000/protected", {
      headers: {
        "Authorization": `Bearer ${token}`  // Attach the JWT token in the Authorization header
      }
    });

    const data = await response.json();
    setMessage(data.logged_in_as ? `Logged in as ${data.logged_in_as}` : "Failed to fetch protected data");
  };

  return (
    <div className="login-page">
      <Header subtitle="Login Page" />  {/* Header component included here */}
      
      <div className="login-form">
        <input type="text" className="login-ID" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        
        <button onClick={handleLogin}>Login</button>
       
       
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        {token && (
          <div>
            <p>{message}</p>
            <button onClick={fetchProtectedData}>Fetch Protected Data</button>
          </div>
        )}
      </div>
      
      <Footer />  {/* Footer component included here */}
    </div>
  );
}

export default LoginPage;
