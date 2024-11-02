import React, { useContext } from "react";
import { Link } from "react-router-dom";
import '../styles/application.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ApplicationContext } from '../context/ApplicationContext'; // Import the context

function ApplicationPage3() {
  const {
    researchAndTeachingInterests,
    setResearchAndTeachingInterests,
    travelPlan,
    setTravelPlan
  } = useContext(ApplicationContext); 

  return (
    <div>
      <Header subtitle="Application Homepage" />
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
          <button>Previous</button>  {/* Button to navigate to the previous application page */}
        </Link>
        
        <Link to="/application4">
          <button>Next</button>  {/* Button to navigate to the next application page */}
        </Link>

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