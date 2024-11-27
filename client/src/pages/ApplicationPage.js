import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/application.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ApplicationContext } from "../context/ApplicationContext";

function ApplicationPage() {
  const {
    admittedSemester,
    setAdmittedSemester,
    collegeStatus,
    setCollegeStatus,
    gpa,
    setGpa,
    ufid,
    setUfid,
    loadApplicationData,
  } = useContext(ApplicationContext);
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");

  const [isFormValid, setIsFormValid] = useState(false);

  // Load data
  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      loadApplicationData(user_id);
    }
  }, []);

  // Validate fields
  useEffect(() => {
    const validateFields = () => {
      const semesterRegex = /^(Fall|fall|Spring|spring|Summer|summer) \d{4}$/;
      const ufidRegex = /^\d{8}$/;
      const gpaValue = parseFloat(gpa);

      if (
        semesterRegex.test(admittedSemester) &&
        ufidRegex.test(ufid) &&
        gpaValue >= 0 &&
        gpaValue <= 4.0 &&
        collegeStatus
      ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };

    validateFields();
  }, [admittedSemester, collegeStatus, gpa, ufid]);

  // Function to handle saving the data when clicking the "Next" button
  const handleNext = async () => {
    const applicationData = {
      admitted_semester: admittedSemester,
      college_status: collegeStatus,
      gpa,
      ufid,
      last_page: "application2",
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, application_data: applicationData }),
      });

      if (response.ok) {
        console.log("Data saved successfully");
        navigate("/application2");
      } else {
        console.error("Failed to save data");
      }
    } catch (error) {
      console.error("Error occurred while saving data:", error);
    }
  };

  return (
    <div>
      <Header subtitle="Application" />
      <h1>TA Application Form</h1>
      <form className="application-form">
        <div>
          <label htmlFor="admittedSemester">Admitted Semester</label>
          <input
            type="text"
            id="admittedSemester"
            value={admittedSemester}
            onChange={(e) => setAdmittedSemester(e.target.value)}
            placeholder="e.g., Fall 2024"
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
            <option value="" disabled>
              Select your college status
            </option>
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
            placeholder="4.0"
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
            placeholder="8-digit UFID"
          />
        </div>
        <p></p>

        <button type="button" onClick={handleNext} disabled={!isFormValid}>
          Next
        </button>
        <p></p>

        <h3> Progress </h3>
        <div className="progressbar">
          <div
            style={{
              height: "30px",
              width: "0%",
              backgroundColor: "#2ecc71",
            }}
          >
            {" "}
          </div>
        </div>

        <div> 0% </div>
      </form>
      <Footer />
    </div>
  );
}

export default ApplicationPage;