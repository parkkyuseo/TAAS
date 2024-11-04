import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ApplicationContext } from '../context/ApplicationContext';
import '../styles/application.css';
import Header from '../components/Header'
import Footer from '../components/Footer'


function ApplicationPage2() {
  const { 
    collegeStatus, 
    setCollegeStatus, 
    countryOfOrigin, 
    setCountryOfOrigin, 
    speakScore, 
    setSpeakScore, 
    eap5836Status, 
    setEap5836Status, 
    eap5837Status, 
    setEap5837Status 
  } = useContext(ApplicationContext);


  return (
  <div>
    <Header subtitle="Application" />  {/* Header component included here */}
    <h1>TA Application Form</h1>
    {/* contents of the application */}
    <form className="application-form">

      <div>
        <label htmlFor="countryOfOrigin">Country of Origin</label>
        <input
          type="text"
          id="countryOfOrigin"
          value={countryOfOrigin}
          onChange={(e) => setCountryOfOrigin(e.target.value)}
        />
      </div>
      <p></p>

      {/* Conditionally render SPEAK/TOEFL iBT score field if countryOfOrigin is not USA */}
      {countryOfOrigin.toLowerCase() !== "usa" && (
        <div>
          <label htmlFor="speakScore">SPEAK and/or TOEFL iBT Score</label>
          <select
            id="speakScore"
            value={speakScore}
            onChange={(e) => setSpeakScore(e.target.value)}
          >
            <option value="n/a">n/a</option>
            <option value="Under 45 Speak / 23 Toefl IBT">Under 45 Speak / 23 Toefl IBT</option>
            <option value="45-50 Speak / 23-27 Toefl IBT">45-50 Speak / 23-27 Toefl IBT</option>
            <option value="55-60 Speak / 28-30 Toefl IBT">55-60 Speak / 28-30 Toefl IBT</option>
          </select>
        </div>
      )}
      <p></p>

      {/* Conditionally render EAP fields if collegeStatus is "Graduate Ph.D." */}
      {countryOfOrigin.toLowerCase() !== "usa" && collegeStatus === "Graduate Ph.D." && (
          <div>
            <label htmlFor="eap5836Status">EAP 5836 Status</label>
            <select
              id="eap5836Status"
              value={eap5836Status}
              onChange={(e) => setEap5836Status(e.target.value)}
            >
              <option value="" disabled>Select status</option>
              <option value="enrolled">Enrolled</option>
              <option value="failed">Failed</option>
              <option value="not taken">Not Taken</option>
              <option value="passed">Passed</option>
            </select>
            <p></p>
            
            <label htmlFor="eap5837Status">EAP 5837 Status</label>
            <select
              id="eap5837Status"
              value={eap5837Status}
              onChange={(e) => setEap5837Status(e.target.value)}
            >
              <option value="" disabled>Select status</option>
              <option value="enrolled">Enrolled</option>
              <option value="failed">Failed</option>
              <option value="not taken">Not Taken</option>
              <option value="passed">Passed</option>
            </select>
          </div>
        )}
        <p></p>

      <Link to="/application">
        <button>Previous</button>  {/* Button to navigate to the previous application page */}
      </Link>
      
      <Link to="/application3">
        <button>Next</button>  {/* Button to navigate to the next application page */}
      </Link>

      <h3> Progress </h3>
        
          <div className = "progressbar">
            <div style= {{
              height: "30px",
              width: "30%",
              backgroundColor: "#2ecc71"
            }}> </div>
            </div>

        <div> 30% </div>

      </form>
      <Footer />  {/* Footer component included here */}
  </div>
  );
}

export default ApplicationPage2;