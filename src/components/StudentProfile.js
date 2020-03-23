import React, { useState, useEffect } from "react";
import { meanBy } from "lodash";

const StudentProfile = ({ student, handleTagInput }) => {
  const {
    id,
    firstName,
    lastName,
    city,
    company,
    email,
    grades,
    pic,
    skill,
    tags
  } = student;

  return (
    <div key={id}>
      <img src={pic} alt="student pic" />
      <h3>{firstName + " " + lastName}</h3>
      <p>Email: {email}</p>
      <p>Company: {company}</p>
      <p>Skill: {skill}</p>
      <p>
        Grades:
        {meanBy(student.grades, function(g) {
          return parseInt(g);
        })}
        %
      </p>
      <input
        type="text"
        className="add-tag-input"
        onSubmit={(e, student) => handleTagInput(e, student)}
      />
    </div>
  );
};

export default StudentProfile;