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
    //console.log('Login Button Clicked');
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
      <Link to="/application">
      <button onClick={handleLogin}>Login</button>
      </Link>
    
      
      {token && (
        <div>
          <p>{message}</p>
          <button onClick={fetchProtectedData}>Fetch Protected Data</button>  {/* Show button if token is present */}
        </div>
      )}
    </div>
  );
}

function ApplicationPage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ID, setID] = useState("");

  return (
    <div>
      <h1>TA Application Form</h1>
      {/* contents of the application */}
      <form>
        <div>Name</div>
        <input type = "text" value = {name} onChange={(e) => setName(e.target.value)}/>
        <p></p>
        <div>Email</div>
        <input type = "text" value = {email} onChange={(e) => setEmail(e.target.value)}/>
        <p></p>
        <div>UF-ID</div>
        <input type = "text" value = {ID} onChange={(e) => setID(e.target.value)}/>
        <p></p>

      <Link to="/application2">
        <button>Next</button>  {/* Button to navigate to the next application page */}
      </Link>
      <p></p>

      <h3> Progress </h3>

      <div className = "progresstop">
            <div style= {{
              height: "5px",
              width: "9%",
              backgroundColor: "#000000"
            }}> </div>
            </div>
        
          <div className = "progressbar">
            <div style= {{
              height: "30px",
              width: "3%",
              backgroundColor: "#2ecc71"
            }}> </div>
            </div>

            <div className = "progressbottom">
            <div style= {{
              height: "5px",
              width: "9%",
              backgroundColor: "#000000"
            }}> </div>
            </div>
        
          
        
        <div> 34% </div>
      
      
      </form>
    </div>
  );
}

function ApplicationPage2() {

  const [GPA, setGPA] = useState("");
  const [major, setMajor] = useState("");
  const [standing, setStanding] = useState("");
  const [year, setYear] = useState("");

  return (
  <div>
    <h1>TA Application Form</h1>
    {/* contents of the application */}
    <form>
        <div>GPA</div>
        <input type = "text" value = {GPA} onChange={(e) => setGPA(e.target.value)}/>
        <p></p>
        <div>Major</div>
        <input type = "text" value = {major} onChange={(e) => setMajor(e.target.value)}/>
        <p></p>
        <div>Current Standing</div>
        <input type = "text" value = {standing} onChange={(e) => setStanding(e.target.value)}/>
        <p></p>
        <div>Graduation Year</div>
        <input type = "text" value = {year} onChange={(e) => setYear(e.target.value)}/>
        <p></p>

      <Link to="/application">
        <button>Previous</button>  {/* Button to navigate to the previous application page */}
      </Link>
      
      <Link to="/application3">
        <button>Next</button>  {/* Button to navigate to the next application page */}
      </Link>

      <h3> Progress </h3>

      <div className = "progresstop">
            <div style= {{
              height: "5px",
              width: "9%",
              backgroundColor: "#000000"
            }}> </div>
            </div>
        
          <div className = "progressbar">
            <div style= {{
              height: "30px",
              width: "6%",
              backgroundColor: "#2ecc71"
            }}> </div>
            </div>

            <div className = "progressbottom">
            <div style= {{
              height: "5px",
              width: "9%",
              backgroundColor: "#000000"
            }}> </div>
            </div>
        
          
        
        <div> 67% </div>

      </form>
  </div>
  );
}

function ApplicationPage3() {

  const [course1, setCourse1] = useState("");
  const [course2, setCourse2] = useState("");
  const [course3, setCourse3] = useState("");
  const [course4, setCourse4] = useState("");
  const [course5, setCourse5] = useState("");

  return (
    <div>
      <h1>TA Application Form</h1>
      <h2>Course Preferences (Up to 5)</h2>
      {/* contents of the application */}
    <form>
        <div>Course 1</div>
        <input type = "text" value = {course1} onChange={(e) => setCourse1(e.target.value)}/>
        <p></p>
        <div>Course 2</div>
        <input type = "text" value = {course2} onChange={(e) => setCourse2(e.target.value)}/>
        <p></p>
        <div>Course 3</div>
        <input type = "text" value = {course3} onChange={(e) => setCourse3(e.target.value)}/>
        <p></p>
        <div>Course 4</div>
        <input type = "text" value = {course4} onChange={(e) => setCourse4(e.target.value)}/>
        <p></p>
        <div>Course 5</div>
        <input type = "text" value = {course5} onChange={(e) => setCourse5(e.target.value)}/>
        <p></p>

      <Link to="/application2">
        <button>Previous</button>  {/* Button to navigate to the previous application page */}
      </Link>

      <Link to="/submission">
        <button>Submit</button>  {/* Button to navigate to the submission page */}
      </Link>

      <h3> Progress </h3>

      <div className = "progresstop">
            <div style= {{
              height: "5px",
              width: "9%",
              backgroundColor: "#000000"
            }}> </div>
            </div>
        
          <div className = "progressbar">
            <div style= {{
              height: "30px",
              width: "9%",
              backgroundColor: "#2ecc71"
            }}> </div>
            </div>

            <div className = "progressbottom">
            <div style= {{
              height: "5px",
              width: "9%",
              backgroundColor: "#000000"
            }}> </div>
            </div>
        
          
        
        <div> 100% </div>
      </form>
  </div>
  );
}

function SubmissionPage() {
  return(
  <div>
      <h1>Thank You for Submitting a TA Application!</h1>
      <h2>You can check the status of your application in the TA system.</h2>
  </div>
  );
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />  {/* Default welcome page */}
        <Route path="/login" element={<LoginPage />} />  {/* Login page */}
        <Route path="/application" element={<ApplicationPage />} />  {/* Application page */}
        <Route path="/application2" element={<ApplicationPage2 />} />  {/* Application page 2 */}
        <Route path="/application3" element={<ApplicationPage3 />} />  {/* Application page 3 */}
        <Route path="submission" element={<SubmissionPage />} />  {/* Submission page */}
      </Routes>
    </Router>
  );
}

export default App;