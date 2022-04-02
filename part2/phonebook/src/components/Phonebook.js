export const Phonebook = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  addName,
}) => {
  return (
    <>
      <h2>Add Contact</h2>
      <form>
        <div>
          Name:
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          Number:
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" onClick={addName}>
            add
          </button>
        </div>
      </form>
    </>
  );
};
