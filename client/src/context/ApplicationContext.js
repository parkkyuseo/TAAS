import React, { createContext, useState } from 'react';

export const ApplicationContext = createContext();

export function ApplicationProvider({ children }) {
  const [admittedSemester, setAdmittedSemester] = useState("");
  const [collegeStatus, setCollegeStatus] = useState("");
  const [gpa, setGpa] = useState("");
  const [ufid, setUfid] = useState("");
  const [countryOfOrigin, setCountryOfOrigin] = useState("");
  const [speakScore, setSpeakScore] = useState("n/a");
  const [eap5836Status, setEap5836Status] = useState("");
  const [eap5837Status, setEap5837Status] = useState("");
  const [researchAndTeachingInterests, setResearchAndTeachingInterests] = useState("");
  const [travelPlan, setTravelPlan] = useState("");
  const [lastPage, setLastPage] = useState("application"); // Set default page for navigation
  
  // Add selectedCourses state here
  const [selectedCourses, setSelectedCourses] = useState([]); // Initialize as an empty array

  // Function to load application data from the backend and populate context
  const loadApplicationData = async (user_id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/application?user_id=${user_id}`);
      if (response.ok) {
        const data = await response.json();
        setAdmittedSemester(data.admitted_semester || "");
        setCollegeStatus(data.college_status || "");
        setGpa(data.gpa || "");
        setUfid(data.ufid || "");
        setCountryOfOrigin(data.country_of_origin || "");
        setSpeakScore(data.test_scores?.speak_toefl || "n/a");
        setEap5836Status(data.eap_status?.eap_5836_status || "");
        setEap5837Status(data.eap_status?.eap_5837_status || "");
        setResearchAndTeachingInterests(data.research_and_teaching_interests || "");
        setTravelPlan(data.travel_plan || "n/a");
        setSelectedCourses(data.course_preferences || []); // Load course preferences from backend if available
      }
    } catch (error) {
      console.error("Failed to load application data:", error);
    }
  };

  return (
    <ApplicationContext.Provider value={{
      admittedSemester, setAdmittedSemester,
      collegeStatus, setCollegeStatus,
      gpa, setGpa,
      ufid, setUfid,
      countryOfOrigin, setCountryOfOrigin,
      speakScore, setSpeakScore,
      eap5836Status, setEap5836Status,
      eap5837Status, setEap5837Status,
      researchAndTeachingInterests, setResearchAndTeachingInterests,
      travelPlan, setTravelPlan,
      lastPage, setLastPage,
      selectedCourses, setSelectedCourses, // Added selectedCourses state here
      loadApplicationData
    }}>
      {children}
    </ApplicationContext.Provider>
  );
}