import React, { useState, useEffect } from "react";
import StudentsContainer from "./containers/StudentsContainer";

import "./App.css";

const App = () => {
  // const [students, setStudents] = useState([]);
  // const [filteredStudents, setFilderedStudents] = useState([]);
  // const [searchName, setSearchName] = useState("");

  // useEffect(() => {
  //   const getStudents = async () => {
  //     const response = await fetch(
  //       "https://www.hatchways.io/api/assessment/students"
  //     );
  //     const data = await response.json();
  //     setStudents(data.students);
  //     // setFilderedStudents(data.students);
  //   };
  //   getStudents();
  // }, []);

  // const handleSearch = e => {
  //   const searchTerm = e.target.value.toLowerCase();
  //   setSearchName(searchTerm);
  //   const searchResult = students.filter(student => {
  //     const fullName = (
  //       student.firstName +
  //       " " +
  //       student.lastName
  //     ).toLowerCase();
  //     return fullName.includes(searchTerm);
  //   });
  //   setFilderedStudents(searchResult);
  // };

  // const handleTagInput = e => {};

  // const renderStudents = () => {
  //   if (students.length === 0) {
  //     return <p>Loading...</p>;
  //   } else {
  //     return filteredStudents.map((student, idx) => {
  //       return (
  //         <div key={idx}>
  //           <img src={student.pic} alt="student pic" />
  //           <h3>{student.firstName + " " + student.lastName}</h3>
  //           <p>Email: {student.email}</p>
  //           <p>Company: {student.company}</p>
  //           <p>Skill: {student.skill}</p>
  //           <p>
  //             Grades:
  //             {meanBy(student.grades, function(g) {
  //               return parseInt(g);
  //             })}
  //             %
  //           </p>
  //           <input
  //             type="text"
  //             className="add-tag-input"
  //             onSubmit={e => handleTagInput(e)}
  //           />
  //         </div>
  //       );
  //     });
  //   }
  // };

  return (
    <div className="App">
      <StudentsContainer />
    </div>
  );
};

export default App;
