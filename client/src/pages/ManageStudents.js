import React from "react";
import '../styles/manager.css';

function ManageStudents({ students }) {
  return (
    <div>
      <h2>Manage Students</h2>
      <table className="students-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>UFID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.ufid}>
              <td>{student.name}</td>
              <td>{student.ufid}</td>
              <td>{student.status}</td>
              <td>
                <button>Edit</button>
                <button>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageStudents;