
import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/application.css';
import Header from '../components/Header'
import Footer from '../components/Footer'


function ApplicationPage2() {

  const [GPA, setGPA] = useState("");
  const [major, setMajor] = useState("");
  const [standing, setStanding] = useState("");
  const [year, setYear] = useState("");

  return (
  <div>
    <Header subtitle="Application Homepage" />  {/* Header component included here */}
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

      {/* <div className = "progresstop">
            <div style= {{
              height: "5px",
              width: "9%",
              backgroundColor: "#000000"
            }}> </div>
            </div> */}
        
          <div className = "progressbar">
            <div style= {{
              height: "30px",
              width: "30%",
              backgroundColor: "#2ecc71"
            }}> </div>
            </div>

            {/* <div className = "progressbottom">
            <div style= {{
              height: "5px",
              width: "9%",
              backgroundColor: "#000000"
            }}> </div>
            </div> */}
        
          
        
        <div> 30% </div>

      </form>
      <Footer />  {/* Footer component included here */}
  </div>
  );
}

export default ApplicationPage2;
