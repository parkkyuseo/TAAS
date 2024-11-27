import React from "react";
import "../styles/manager.css";

function ManageStudents({ students }) {
  return (
    <div>
      <h2>Manage Students</h2>
      <div className="tabs">
        {students.map((student, index) => (
          <div className="tab" key={index}>
            <input type="checkbox" id={`chck${index}`} />
            <label className="tab-label" htmlFor={`chck${index}`}>
              {student.name} ({student.ufid}) - {student.status}
            </label>
            <div className="tab-content">
              {/* Courses and Preferences Card */}
              <div className="card">
                <h4>Courses and Preferences</h4>
                {student.course_preferences && student.course_preferences.length > 0 ? (
                  student.course_preferences.map((course, idx) => (
                    <div key={idx} className="course-item">
                      <p><strong>Course:</strong> {course.course || "Unknown Course"}</p>
                      <p><strong>Preference:</strong> {course.preference || "No Preference"}</p>
                    </div>
                  ))
                ) : (
                  <p>No courses listed</p>
                )}
              </div>

              {/* Application Details Card */}
              <div className="card">
                <h4>Application Details</h4>
                <p><strong>GPA:</strong> {student.gpa || "N/A"}</p>
                <p><strong>Admitted Semester:</strong> {student.admitted_semester || "N/A"}</p>
                <p><strong>Country of Origin:</strong> {student.country_of_origin || "N/A"}</p>
                <p><strong>Research & Teaching Interests:</strong> {student.research_and_teaching_interests || "N/A"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageStudents;

// Source: https://codeconvey.com/responsive-accordion-pure-css/