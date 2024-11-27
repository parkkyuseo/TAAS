import React, { useState, useEffect } from "react";
import "../styles/manager.css";

function ManageProfessors() {
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/professors");
        if (response.ok) {
          const data = await response.json();
          setProfessors(data);
        } else {
          throw new Error("Failed to fetch professors");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessors();
  }, []);

  if (loading) return <p>Loading Professors...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Manage Professors</h2>
      <table className="professors-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Assigned Courses</th>
          </tr>
        </thead>
        <tbody>
          {professors.map((professor, index) => (
            <tr key={index}>
              <td>{professor.name}</td>
              <td>{professor.email}</td>
              <td>
                {professor.assigned_courses.length > 0
                  ? professor.assigned_courses.join(", ")
                  : "None"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageProfessors;