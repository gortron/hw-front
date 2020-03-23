import React, { useState, useEffect, Fragment } from "react";
import StudentProfile from "../components/StudentProfile";

const StudentsContainer = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilderedStudents] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchTag, setSearchTag] = useState("");

  useEffect(() => {
    const getStudents = async () => {
      const response = await fetch(
        "https://www.hatchways.io/api/assessment/students"
      );
      const data = await response.json();
      setStudents(data.students);
      setFilderedStudents(data.students);
    };
    getStudents();
  }, []);

  const handleSearch = e => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchName(searchTerm);
    const searchResult = students.filter(student => {
      const fullName = (
        student.firstName +
        " " +
        student.lastName
      ).toLowerCase();
      return fullName.includes(searchTerm);
    });
    setFilderedStudents(searchResult);
  };

  const handleTagSearch = e => {};
  const handleTagInput = e => {
    // spread students, only update the one student with the tag, then setStudents to the updated list
  };

  const renderSearchFields = () => {
    return (
      <Fragment>
        <input
          type="text"
          placeholder="Search by name"
          onChange={e => handleSearch(e)}
        />
        <input
          id="tag-input"
          type="text"
          placeholder="Search by tag"
          onChange={e => handleSearch(e)}
        />
      </Fragment>
    );
  };

  const renderStudentProfiles = () => {
    if (filteredStudents.length === 0) {
      return <p>Loading...</p>;
    } else {
      return filteredStudents.map(student => {
        return (
          <StudentProfile student={student} handleTagInput={handleTagInput} />
        );
      });
    }
  };

  return (
    <div>
      {renderSearchFields()}
      {renderStudentProfiles()}
    </div>
  );
};

export default StudentsContainer;
