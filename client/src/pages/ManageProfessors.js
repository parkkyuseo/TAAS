import React, { useState, useEffect } from "react";

function ManageProfessors() {
  const [professors, setProfessors] = useState([]);

  // Fetch professors' data from the server
  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/professors");
        if (response.ok) {
          const data = await response.json();
          setProfessors(data);
        } else {
          console.error("Failed to fetch professors' data");
        }
      } catch (error) {
        console.error("Error fetching professors:", error);
      }
    };

    fetchProfessors();
  }, []);

  return (
    <div>
      <h2>Manage Professors</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Assigned Courses</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {professors.map((professor) => (
            <tr key={professor.id}>
              <td>{professor.name}</td>
              <td>{professor.courses.join(", ")}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageProfessors;
