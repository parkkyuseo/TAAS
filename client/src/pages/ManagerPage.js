import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"; 
import Footer from "../components/Footer"; 
import ManageStudents from "./ManageStudents";
import ManageCourses from "./ManageCourses";
import ManageProfessors from "./ManageProfessors";
import "../styles/manager.css";

function ManagerPage() {
  const [activeTab, setActiveTab] = useState("students");
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
      <Header subtitle="Manager Dashboard" /> {/* Shared Header */}
      <main className="manager-content">
        <h1>Manager Dashboard</h1>
        <div className="button-group">
          <button
            className={activeTab === "students" ? "active" : ""}
            onClick={() => setActiveTab("students")}
          >
            Manage Students
          </button>
          <button
            className={activeTab === "courses" ? "active" : ""}
            onClick={() => setActiveTab("courses")}
            disabled
          >
            Manage Courses
          </button>
          <button
            className={activeTab === "professors" ? "active" : ""}
            onClick={() => setActiveTab("professors")}
            disabled
          >
            Manage Professors
          </button>
        </div>

        {/* Conditionally render based on activeTab */}
        {activeTab === "students" && <ManageStudents students={studentsData} />}
        {activeTab === "courses" && <ManageCourses />}
        {activeTab === "professors" && <ManageProfessors />}
      </main>
      <Footer /> {/* Shared Footer */}
    </div>
  );
}

export default ManagerPage;