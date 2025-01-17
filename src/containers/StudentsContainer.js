import React, { useState, useEffect, Fragment } from "react";
import StudentProfile from "../components/StudentProfile";
import { CardGroup, Container, Input } from "semantic-ui-react";

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

  useEffect(() => {
    const handleSearch = () => {
      const searchResult = students.filter(student => {
        const fullName = (
          student.firstName +
          " " +
          student.lastName
        ).toLowerCase();

        let tagString = "";
        if (student.tags) {
          student.tags.forEach(tag => (tagString += " " + tag.toLowerCase()));
        }

        return fullName.includes(searchName) && tagString.includes(searchTag);
      });
      setFilderedStudents(searchResult);
    };
    handleSearch();
  }, [searchName, searchTag, students]);

  const updateSearchName = e => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchName(searchTerm);
  };

  const updateSearchTag = e => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTag(searchTerm);
  };

  const handleTagInput = (e, studentId) => {
    const studentsCopy = [...students];
    let studentCopy = studentsCopy.find(copy => copy.id === studentId);
    if (!studentCopy["tags"]) {
      studentCopy["tags"] = [e.target.value];
    } else {
      studentCopy["tags"] = [...studentCopy["tags"], e.target.value];
    }
    e.target.value = "";
    setStudents(studentsCopy);
  };

  const renderSearchFields = () => {
    return (
      <CardGroup>
        <Input
          key="name-search"
          className="search-field"
          type="text"
          placeholder="Search by name"
          onChange={e => updateSearchName(e)}
        />
        <Input
          key="tag-search"
          className="search-field"
          id="tag-input"
          type="text"
          placeholder="Search by tag"
          onChange={e => updateSearchTag(e)}
        />
      </CardGroup>
    );
  };

  const renderStudentProfiles = () => {
    if (filteredStudents.length === 0 && !searchName && !searchTag) {
      return <p>Loading...</p>;
    } else if (filteredStudents.length === 0) {
      return <p>No results found for those terms.</p>;
    } else {
      return (
        <CardGroup>
          {filteredStudents.map(student => {
            return (
              <Fragment>
                <StudentProfile
                  student={student}
                  handleTagInput={handleTagInput}
                />
              </Fragment>
            );
          })}
        </CardGroup>
      );
    }
  };

  return (
    <Container className="students-container">
      {renderSearchFields()}
      {renderStudentProfiles()}
    </Container>
  );
};

export default StudentsContainer;
