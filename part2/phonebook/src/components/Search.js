export const Search = ({ search, setSearch }) => {
  // const [filteredPersons, setFilteredPersons] = useState(persons);
  // const [search, setSearch] = useState("");
  const handleChange = (event) => {
    const val = event.target.value;
    setSearch(val);
  };

  return (
    <div>
      <h2>Search</h2>
      <form>
        <div>
          <input value={search} onChange={handleChange} />
        </div>
      </form>
    </div>
  );
};
