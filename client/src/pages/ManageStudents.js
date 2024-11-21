import React, { useState, useEffect } from "react";

function ManageStudents() {
  const [students, setStudents] = useState([]);

  // Fetch students' data from the server
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/students");
        if (response.ok) {
          const data = await response.json();
          setStudents(data);
        } else {
          console.error("Failed to fetch students' data");
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <h2>Manage Students</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>UFID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.ufid}>
              <td>{student.name}</td>
              <td>{student.ufid}</td>
              <td>{student.status}</td>
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

export default ManageStudents;
