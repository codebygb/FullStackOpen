export const Numbers = ({ persons, remove }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => remove(person.id, person.name)}>delete</button>
        </p>
      ))}
    </>
  );
};
