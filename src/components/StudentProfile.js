import React, { useState, Fragment } from "react";
import { meanBy } from "lodash";
import { Card, Image, Button, Icon, Input, Container } from "semantic-ui-react";

const StudentProfile = ({ student, handleTagInput }) => {
  const [expanded, setExpanded] = useState(false);

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

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const renderGradesAndTags = () => {
    const renderedGrades = grades.map((grade, idx) => {
      return (
        <Card.Meta>
          Test {idx}:{grade}%
        </Card.Meta>
      );
    });
    const renderedTags = !tags
      ? null
      : tags.map(tag => {
          return (
            <Button className="tag-button" disabled>
              {tag}
            </Button>
          );
        });
    const tagField = (
      <Input
        type="text"
        className="add-tag-input"
        placeholder="Add a tag"
        transparent
        onKeyPress={(e, student) => {
          if (e.key === "Enter") handleTagInput(e, id);
        }}
      />
    );
    return (
      <Fragment>
        <br />
        {renderedGrades}
        <br />
        <Container className="student-tags">{renderedTags}</Container>
        <br />
        {tagField}
      </Fragment>
    );
  };

  return (
    <Card key={id} className="student-profile">
      <Card.Content>
        <Button
          className="expand-button"
          floated="right"
          icon
          onClick={() => handleExpand()}
        >
          <Icon size="big" name="plus" />
        </Button>
        <Image
          src={pic}
          alt="student pic"
          floated="left"
          size="tiny"
          circular
          bordered
        />

        <Card.Header>
          {firstName.toUpperCase() + " " + lastName.toUpperCase()}
        </Card.Header>
        <Card.Meta>Email: {email}</Card.Meta>
        <Card.Meta>Company: {company}</Card.Meta>
        <Card.Meta>Skill: {skill}</Card.Meta>
        <Card.Meta>
          Average:{" "}
          {meanBy(student.grades, function(g) {
            return parseInt(g);
          })}
          %
        </Card.Meta>
        {expanded ? renderGradesAndTags() : null}
      </Card.Content>
    </Card>
  );
};

export default StudentProfile;
