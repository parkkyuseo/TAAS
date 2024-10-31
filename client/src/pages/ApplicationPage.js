import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/application.css';
import Header from '../components/Header'
import Footer from '../components/Footer'

function ApplicationPage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ID, setID] = useState("");

  return (
    <div>
      <Header subtitle="Application Homepage (student)" />  {/* Header component included here */}
      <h1>TA Application Form</h1>
      {/* contents of the application */}
      <form>
        <div>Name</div>
        <input type = "text" value = {name} onChange={(e) => setName(e.target.value)}/>
        <p></p>
        <div>Email</div>
        <input type = "text" value = {email} onChange={(e) => setEmail(e.target.value)}/>
        <p></p>
        <div>UF-ID</div>
        <input type = "text" value = {ID} onChange={(e) => setID(e.target.value)}/>
        <p></p>

      <Link to="/application2">
        <button>Next</button>  {/* Button to navigate to the next application page */}
      </Link>
      <p></p>

      <h3> Progress </h3>

      {/* <div className = "progresstop">
            <div style= {{
              height: "5px",
              width: "9%",
              backgroundColor: "#000000"
            }}> </div>
            </div> */}
        
          <div className = "progressbar">
            <div style= {{
              height: "30px",
              width: "0%",
              backgroundColor: "#2ecc71"
            }}> </div>
            </div>

            {/* <div className = "progressbottom">
            <div style= {{
              height: "5px",
              width: "9%",
              backgroundColor: "#000000"
            }}> </div>
            </div> */}
        
          
        
        <div> 0% </div>
      
      
      </form>
      <Footer />  {/* Footer component included here */}
    </div>
  );
}

export default ApplicationPage;
