import React, { useState, useContext, useEffect } from "react";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ApplicationContext } from "../context/ApplicationContext";
import '../styles/application.css';

function ApplicationPage4() {
  const { selectedCourses, setSelectedCourses, loadApplicationData } = useContext(ApplicationContext);
  const maxCourses = 5; // Maximum number of courses to select

  const [courseList, setCourseList] = useState([]);

  const navigate = useNavigate();

  // Fetch courses from the server
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/courses');
        if (response.ok) {
          const data = await response.json();
          setCourseList(data);
        } else {
          console.error("Failed to fetch courses");
        }
      } catch (error) {
        console.error("Error occurred while fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);


  // Load data 
  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      loadApplicationData(user_id);
    }
  }, []);  
  

  // Format courses for react-select
  const courseOptions = courseList.map(course => ({
    value: course.code,
    label: `${course.code} | ${course.title}`,
  }));

  // Handle course selection changes
  const handleCourseChange = (selectedOptions) => {
    setSelectedCourses(selectedOptions.map(option => ({
      course: option.value,
      preference: "Highly Preferred",
    })));
  };

  // Handle preference change for individual courses
  const handlePreferenceChange = (courseCode, preference) => {
    setSelectedCourses(prevCourses =>
      prevCourses.map(course =>
        course.course === courseCode ? { ...course, preference } : course
      )
    );
  };
  // Function to handle saving course preferences
  const handleSave = async () => {
    const user_id = localStorage.getItem("user_id");
    const applicationData = {
      course_preferences: selectedCourses
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, application_data: applicationData })
      });

      if (response.ok) {
        console.log("Course preferences saved successfully");
      } else {
        console.error("Failed to save course preferences");
      }
    } catch (error) {
      console.error("Error occurred while saving data:", error);
    }
  };

  const handleSubmit = async () => {
    const user_id = localStorage.getItem("user_id");
    const applicationData = {
      course_preferences: selectedCourses,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/application_submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, application_data: applicationData })
      });

      if (response.ok) {
        console.log("Application submitted successfully");
        navigate("/application-homepage");  // Redirect to the Application Homepage
      } else {
        console.error("Failed to submit application");
      }
    } catch (error) {
      console.error("Error occurred during submission:", error);
    }
  };

  return (
    <div>
      <Header subtitle="Application" />
      <h1>TA Application Form</h1>
      
      <form className="application-form">
        <h2>Select up to 5 Courses</h2>
        
        {/* React-Select dropdown for course selection */}
        <Select
          isMulti
          options={courseOptions}
          value={selectedCourses.map(course => ({
            value: course.course,
            label: courseOptions.find(option => option.value === course.course)?.label,
          }))}
          onChange={handleCourseChange}
          isOptionDisabled={() => selectedCourses.length >= maxCourses}
          placeholder="Search and select courses"
        />

        {/* Preference dropdown for each selected course */}
        {selectedCourses.map(course => (
          <div key={course.course} style={{ marginTop: "10px" }}>
            <label>{course.course} Preference:</label>
            <select
              value={course.preference}
              onChange={(e) => handlePreferenceChange(course.course, e.target.value)}
            >
              <option value="Highly Preferred">Highly Preferred</option>
              <option value="Somewhat Preferred">Somewhat Preferred</option>
              <option value="Neither Preferred nor Undesired">Neither Preferred nor Undesired</option>
              <option value="Undesired but Acceptable">Undesired but Acceptable</option>
            </select>
          </div>
        ))}

        <div className="button-group">
          <Link to="/application3">
            <button>Previous</button> {/* Link to previous page */}
          </Link>
          

          <button type="button" onClick={handleSave}>Save</button>
          

          <button type="button" onClick={handleSubmit}>Submit</button>
          
        </div>

        <h3>Progress</h3>
        <div className="progressbar">
          <div style={{
            height: "30px",
            width: "90%", // 90% progress for fourth page
            backgroundColor: "#2ecc71"
          }}> </div>
        </div>
        <div>90%</div>
      </form>
      
      <Footer />
    </div>
  );
}

export default ApplicationPage4;