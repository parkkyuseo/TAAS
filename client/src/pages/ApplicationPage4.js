
import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/application.css';
import Header from '../components/Header'
import Footer from '../components/Footer'

function ApplicationPage4() {

  const [course1, setCourse1] = useState("");
  const [course2, setCourse2] = useState("");
  const [course3, setCourse3] = useState("");
  const [course4, setCourse4] = useState("");
  const [course5, setCourse5] = useState("");

  return (
    <div>
      <Header subtitle="Application Homepage" />  {/* Header component included here */}
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
        
          <div className = "progressbar">
            <div style= {{
              height: "30px",
              width: "70%",
              backgroundColor: "#2ecc71"
            }}> </div>
            </div>

        <div> 70% </div>
      </form>
      <Footer />  {/* Footer component included here */}
  </div>
  );
}


export default ApplicationPage4;
