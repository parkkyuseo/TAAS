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
import WelcomePage from './pages/WelcomePage'; 
import LoginPage from './pages/LoginPage'; 
import ApplicationPage from './pages/ApplicationPage'
import ApplicationPage2 from './pages/ApplicationPage2'
import ApplicationPage3 from './pages/ApplicationPage3'
import SubmissionPage from './pages/SubmissionPage'



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
