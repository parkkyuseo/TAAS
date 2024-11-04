// src/pages/ApplicationHomepage.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/applicationHomepage.css';

function getCurrentSemester() {
  const date = new Date();
  const month = date.getMonth(); 
  const year = date.getFullYear();

  let semester;
  if (month >= 0 && month <= 4) {
    semester = `Spring ${year}`; // January to April
  } else if (month >= 5 && month <= 7) {
    semester = `Summer ${year}`; // May to July
  } else {
    semester = `Fall ${year}`; // August to December
  }

  return semester;
}

function ApplicationHomepage() {
  const [applicationData, setApplicationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const user_id = localStorage.getItem("user_id");
  console.log("Retrieved user_id:", user_id); // Check if user_id is available

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/application?user_id=${user_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setApplicationData(data);
        } else {
          throw new Error("Failed to fetch application data");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const currentSemester = getCurrentSemester();
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  const handleContinueApplication = () => {
    if (applicationData?.last_page) {
      navigate(`/${applicationData.last_page}`);  // Redirect to the last page stored in the data
    } else {
      navigate('/application');  // Fallback to the first application page
    }
  };


  return (
    <div className="application-homepage">
      <Header subtitle="Application Homepage" />
      
      <main className="application-main">
        <h2>{currentSemester}</h2> {/* Display the current semester */}
        {applicationData?.status === "Incomplete" && applicationData.last_edited && (
           <span> | Last Edited {applicationData.last_edited}</span>  // Show last edited date if status is "Incomplete"
        )}
        <p><strong>Application Status:</strong></p>
        <p>{applicationData.status}</p> {/* Display status */}

        {/* Show buttons based on application status */}
        {applicationData.status === "Not Started" && (
          <Link to="/application">
          <button className="begin-button">Begin New Application</button>
          </Link>
        )}

        {applicationData.status === "Incomplete" && (
          <div>
            <button className="continue-button" onClick={handleContinueApplication}>
              Continue Application
            </button>
            <button className="withdraw-button">Withdraw Application</button>
          </div>
        )}

        {applicationData.status === "Complete" && (
          <button className="withdraw-button">Withdraw Application</button>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default ApplicationHomepage;