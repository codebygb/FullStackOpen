export const Phonebook = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  addName,
}) => {
  return (
    <>
      <h2>Phonebook</h2>
      <form>
        <div>
          name:
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number:
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
