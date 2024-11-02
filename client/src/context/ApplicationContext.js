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
      travelPlan, setTravelPlan
    }}>
      {children}
    </ApplicationContext.Provider>
  );
}