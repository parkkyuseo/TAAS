import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ManageStudents from "./ManageStudents";
import ManageCourses from "./ManageCourses";
import ManageProfessors from "./ManageProfessors";
import "../styles/manager.css";

function ManagerPage() {
  const [activeSection, setActiveSection] = useState(null); // Track the active section
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/manager/students");
        if (response.ok) {
          const data = await response.json();
          setStudentsData(data);
        } else {
          throw new Error("Failed to fetch students' data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading Manager Dashboard...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="manager-dashboard">
      <Header subtitle="Manager Dashboard" />
      <main className="manager-content">
        <div className="button-group">
          <figure
            className="figure-button"
            onClick={() => setActiveSection("students")}
          >
            <img
              src="images/student.png"
              alt="Manage Students"
              className="figure-icon"
            />
            <figcaption className="figure-caption">Manage Students</figcaption>
          </figure>

          <figure
            className="figure-button"
            onClick={() => setActiveSection("courses")}
          >
            <img
              src="images/books.png"
              alt="Manage Courses"
              className="figure-icon"
            />
            <figcaption className="figure-caption">Manage Courses</figcaption>
          </figure>

          <figure
            className="figure-button"
            onClick={() => setActiveSection("professors")}
          >
            <img
              src="images/school.png"
              alt="Manage Professors"
              className="figure-icon"
            />
            <figcaption className="figure-caption">Manage Professors</figcaption>
          </figure>
        </div>

        {/* Conditional rendering for active section */}
        <div className="manager-details">
          {activeSection === "students" && <ManageStudents students={studentsData} />}
          {activeSection === "courses" && <ManageCourses />}
          {activeSection === "professors" && <ManageProfessors />}
          {!activeSection && <p>Select a section to manage.</p>}
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Pictogram: 
// <a href="https://www.flaticon.com/free-icons/teacher" title="teacher icons">Teacher icons created by Park Jisun - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/student" title="student icons">Student icons created by Tempo_doloe - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/student" title="student icons">Student icons created by Defamiravi Studio - Flaticon</a>
// <a href="https://www.flaticon.com/free-icons/student" title="student icons">Student icons created by Freepik - Flaticon</a>
export default ManagerPage;