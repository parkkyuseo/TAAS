import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/application.css';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ApplicationContext } from '../context/ApplicationContext';

function ApplicationPage() {
  const {
    admittedSemester,
    setAdmittedSemester,
    collegeStatus,
    setCollegeStatus,
    gpa,
    setGpa,
    ufid,
    setUfid
  } = useContext(ApplicationContext);
  const navigate = useNavigate();


  // Function to handle saving the data when clicking the "Next" button
  const handleNext = async () => {
    const user_id = localStorage.getItem("user_id");
    const applicationData = {
      admitted_semester: admittedSemester, 
      college_status: collegeStatus,        
      gpa,
      ufid,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, application_data: applicationData }), 
      });

      if (response.ok) {
        console.log("Data saved successfully");
        navigate("/application2");
        console.error("Failed to save data");
      }
    } catch (error) {
      console.error("Error occurred while saving data:", error);
    }
  };

  return (
    <div>
      <Header subtitle="Application" />  {/* Header component included here */}
      <h1>TA Application Form</h1>
      {/* contents of the application */}
      <form className="application-form">
      <div>
        <label htmlFor="admittedSemester">Admitted Semester</label>
        <input
          type="text"
          id="admittedSemester"
          value={admittedSemester}
          onChange={(e) => setAdmittedSemester(e.target.value)}
        />
      </div>
      <p></p>
      
      <div>
        <label htmlFor="collegeStatus">College Status</label>
        <select
          id="collegeStatus"
          value={collegeStatus}
          onChange={(e) => setCollegeStatus(e.target.value)}
        >
          <option value="" disabled>Select your college status</option>
          <option value="Graduate Masters">Graduate Masters</option>
          <option value="Graduate Ph.D.">Graduate Ph.D.</option>
          <option value="Undergraduate Junior">Undergraduate Junior</option>
          <option value="Undergraduate Senior">Undergraduate Senior</option>
          <option value="Undergraduate Sophomore">Undergraduate Sophomore</option>
        </select>
      </div>
      <p></p>
      
      <div>
        <label htmlFor="gpa">GPA</label>
        <input
          type="text"
          id="gpa"
          value={gpa}
          onChange={(e) => setGpa(e.target.value)}
        />
      </div>
      <p></p>
      
      <div>
        <label htmlFor="ufid">UFID</label>
        <input
          type="text"
          id="ufid"
          value={ufid}
          onChange={(e) => setUfid(e.target.value)}
        />
      </div>
      <p></p>


      <button type="button" onClick={handleNext}>Next</button>
      <p></p>

      <h3> Progress </h3>
          <div className = "progressbar">
            <div style= {{
              height: "30px",
              width: "0%",
              backgroundColor: "#2ecc71"
            }}> </div>
            </div>
        
        <div> 0% </div>
      
      
      </form>
      <Footer />  {/* Footer component included here */}
    </div>
  );
}

export default ApplicationPage;
