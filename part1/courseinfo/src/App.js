const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1.name}
        exercises1={part1.exercises}
        part2={part2.name}
        exercises2={part2.exercises}
        part3={part3.name}
        exercises3={part3.exercises}
      />
      <Totals
        exercises1={part1.exercises}
        exercises2={part2.exercises}
        exercises3={part3.exercises}
      />
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part part={props.part1} exercises={props.exercises1} />
      <Part part={props.part2} exercises={props.exercises2} />
      <Part part={props.part3} exercises={props.exercises3} />
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

function Totals({ exercises1, exercises2, exercises3 }) {
  return <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>;
}

export default App;
