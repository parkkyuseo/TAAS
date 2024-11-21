import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ManageStudents from "./ManageStudents";
import ManageCourses from "./ManageCourses";
import ManageProfessors from "./ManageProfessors";
import "../styles/manager.css"; // CSS file for styling the dashboard

function ManagerPage() {
  const [activeTab, setActiveTab] = useState("students"); // Default tab

  return (
    <div>
      <Header subtitle="Manager Dashboard" />
      <div className="manager-dashboard">
        <h1>Manager Dashboard</h1>
        
        {/* Tab navigation */}
        <div className="tab-navigation">
          <button 
            className={activeTab === "students" ? "active-tab" : ""}
            onClick={() => setActiveTab("students")}
          >
            Manage Students
          </button>
          <button 
            className={activeTab === "courses" ? "active-tab" : ""}
            onClick={() => setActiveTab("courses")}
          >
            Manage Courses
          </button>
          <button 
            className={activeTab === "professors" ? "active-tab" : ""}
            onClick={() => setActiveTab("professors")}
          >
            Manage Professors
          </button>
        </div>

        {/* Tab content */}
        <div className="tab-content">
          {activeTab === "students" && <ManageStudents />}
          {activeTab === "courses" && <ManageCourses />}
          {activeTab === "professors" && <ManageProfessors />}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ManagerPage;