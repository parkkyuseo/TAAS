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
  const [message, setMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

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

  // Validate form for submit button
  useEffect(() => {
    // Ensure the button is disabled when no courses are selected
    setIsFormValid(selectedCourses && selectedCourses.length > 0);
  }, [selectedCourses]);

  // Format courses for react-select
  const courseOptions = courseList.map(course => ({
    value: course.code,
    label: `${course.code} | ${course.title}`,
  }));

  // Handle course selection changes
  const handleCourseChange = (selectedOptions) => {
    const updatedCourses = selectedOptions.map(option => {
      const existingCourse = selectedCourses.find(course => course.course === option.value);
      return existingCourse || { course: option.value, preference: "Highly Preferred" };
    });
    setSelectedCourses(updatedCourses);
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
      course_preferences: selectedCourses,
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
        setMessage("Preferences saved! Redirecting to homepage...");
        
        // Delay navigation to allow user to see the message
        setTimeout(() => {
          navigate("/application-homepage");
        }, 3000); // 3 seconds delay
      } else {
        console.error("Failed to save course preferences");
        setMessage("Failed to save preferences. Please try again.");
      }
    } catch (error) {
      console.error("Error occurred while saving data:", error);
      setMessage("An error occurred while saving preferences.");
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
        navigate("/application-homepage"); // Redirect to the Application Homepage
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
      <button>Previous</button>
    </Link>

    <button type="button" onClick={handleSave}>
      Save
    </button>

    <button type="button" onClick={handleSubmit} disabled={!isFormValid}>
      Submit
    </button>
  </div>

  {message && (
    <p style={{ color: "green", marginTop: "20px", fontSize: "16px" }}>
      {message}
    </p>
  )}

  <h3>Progress</h3>
  <div className="progressbar">
    <div
      style={{
        height: "30px",
        width: "90%",
        backgroundColor: "#2ecc71",
      }}
    ></div>
  </div>
  <div>90%</div>
</form>

      <Footer />
    </div>
  );
}

export default ApplicationPage4;