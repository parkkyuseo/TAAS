// import React, {useState, useEffect} from "react";

// function App() {
//   // state
//   const [data, setData] = useState([{}])

//   useEffect(() => 
//     {
//     	fetch("/users").then(
//           response => response.json()
//         ).then(
//           data => {
//             // 받아온 데이터를 data 변수에 update
//             setData(data);
//           }
//         ).catch(
//           (err) => console.log(err)
//         )
//     }, [])

//     return (
//       <div className="App">
//         <h1>React Test...</h1>
//         <div>
//           {/* Ternary operator */}
//           {typeof data.users === "undefined" ? (
//             // Handle case when fetch is not yet complete
//             <p>loading...</p>
//           ) : (
//             // Map through 'users' array and display each user's name
//             data.users.map((u) => <p key={u.id}>{u.password}</p>)
//           )}
//         </div>
//       </div>
//     );
// }

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";

function WelcomePage() {
  return (
    <div>
      <h1>Welcome to the TA Application System</h1>
      <Link to="/login">
        <button>Go to Login</button>  {/* Button to navigate to the login page */}
      </Link>
    </div>
  );
}

function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState("");

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
    } else {
      setMessage("Login failed: " + data.error);
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
    <div>
      <h1>Login</h1>
      <input type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      
      {token && (
        <div>
          <p>{message}</p>
          <button onClick={fetchProtectedData}>Fetch Protected Data</button>  {/* Show button if token is present */}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />  {/* Default welcome page */}
        <Route path="/login" element={<LoginPage />} />  {/* Login page */}
      </Routes>
    </Router>
  );
}

export default App;