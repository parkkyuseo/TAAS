import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/application.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ApplicationContext } from '../context/ApplicationContext'; // Import the context

function ApplicationPage3() {
  const {
    researchAndTeachingInterests,
    setResearchAndTeachingInterests,
    travelPlan,
    setTravelPlan,
    loadApplicationData
  } = useContext(ApplicationContext); 

  const navigate = useNavigate();

  // Load data 
  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      loadApplicationData(user_id);
    }
  }, []);  

  // Function to handle saving the data when clicking the "Next" button
  const handleNext = async () => {
    const user_id = localStorage.getItem("user_id");
    const applicationData = {
      research_and_teaching_interests: researchAndTeachingInterests,
      travel_plan: travelPlan,
      last_page: "application4"
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
        navigate("/application4");
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
          <label htmlFor="researchAndTeachingInterests">Research and Teaching Interests</label>
          <textarea
            id="researchAndTeachingInterests"
            value={researchAndTeachingInterests}
            onChange={(e) => setResearchAndTeachingInterests(e.target.value)}
            rows="5"
            placeholder="Describe your research and teaching interests..."
          ></textarea>
        </div>
        <p></p>
        
        <div>
          <label htmlFor="travelPlan">Travel Plan</label>
          <textarea
            id="travelPlan"
            value={travelPlan}
            onChange={(e) => setTravelPlan(e.target.value)}
            rows="3"
            placeholder="List your travel plans during the applying semester (e.g., 'N/A' if none)..."
          ></textarea>
        </div>
        <p></p>

        <Link to="/application2">
          <button type="button">Previous</button> {/* Button to navigate to the previous application page */}
        </Link>
        
        <button type="button" onClick={handleNext}>Next</button> {/* Save and navigate to the next page */}

        <h3> Progress </h3>
        <div className="progressbar">
          <div style={{
            height: "30px",
            width: "60%",  // Adjust percentage to indicate progress
            backgroundColor: "#2ecc71"
          }}> </div>
        </div>
        
        <div> 60% </div>
      </form>
      <Footer />
    </div>
  );
}

export default ApplicationPage3;