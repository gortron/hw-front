import React, { useState, useEffect } from "react";
import _ from "lodash";
import "./App.css";

const App = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const getStudents = async () => {
      const response = await fetch(
        "https://www.hatchways.io/api/assessment/students"
      );
      const data = await response.json();
      setStudents(data.students);
    };
    getStudents();
  }, []);

  const renderStudents = () => {
    if (students.length === 0) {
      return <p>Loading...</p>;
    } else {
      return students.map(student => {
        return (
          <div>
            <img src={student.pic} alt="student pic" />
            <h3>{student.firstName}</h3>
            <p>Email: {student.email}</p>
            <p>Company: {student.company}</p>
            <p>Skill: {student.skill}</p>
            <p>
              Grades:{" "}
              {_.meanBy(student.grades, function(g) {
                return parseInt(g);
              })}
            </p>
          </div>
        );
      });
    }
  };

  return <div className="App">{renderStudents()}</div>;
};

export default App;
