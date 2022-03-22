import React from "react";

export default function Course({ course }) {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Totals parts={course.parts} />
    </>
  );
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

function Part({ part, exercises }) {
  return (
    <p>
      {part} {exercises}
    </p>
  );
}

function Header({ course }) {
  return <h1>{course}</h1>;
}

function Totals({ parts }) {
  return (
    <b>
      Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}
    </b>
  );
}
