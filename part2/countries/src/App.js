import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const filterCountry = (val) =>
    setFilteredCountries(
      countries.filter((country) =>
        country.name["common"].toLowerCase().includes(val.toLowerCase())
      )
    );

  const getCountry = (countryname) => {
    setCountry(countryname);
    setFilteredCountries(
      countries.filter((country) => country.name["common"] === countryname)
    );
  };

  const handleChange = (event) => {
    const val = event.target.value;
    setCountry(val);
    val === "" ? setFilteredCountries([]) : filterCountry(val);
  };

  return (
    <div className="App">
      Find Countries
      <input type="text" value={country} onChange={handleChange} />
      <RenderCountries
        filteredCountries={filteredCountries}
        getCountry={getCountry}
      />
    </div>
  );
}

const RenderCountries = ({ filteredCountries, getCountry }) => {
  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
    return filteredCountries.map((country) => (
      <div key={country.cca2}>
        {country.name["common"]}{" "}
        <button onClick={() => getCountry(country.name["common"])}>show</button>
      </div>
    ));
  }
  if (filteredCountries.length === 1) {
    return filteredCountries.map((country) => (
      <div key={country.cca2}>
        <h1>{country.name["common"]}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h2>languages: </h2>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.svg} width="100" alt={country.name} />
        <Weather
          capital={country.capital}
          capitalLat={country.capitalInfo.latlng[0]}
          capitalLong={country.capitalInfo.latlng[1]}
        />
      </div>
    ));
  }
  return <p>Find countries by typing above</p>;
};

const Weather = ({ capital, capitalLat, capitalLong }) => {
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${capitalLat}&lon=${capitalLong}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        setWeather(response.data);
        setLoading(false);
      });
  }, [capitalLat, capitalLong]);
  return loading ? (
    <p>loading...</p>
  ) : (
    <div>
      <h2>Weather in {capital ?? ""}</h2>
      <p>Temperature: {weather?.main?.temp ?? ""} Celsius</p>
      <img
        src={`https://openweathermap.org/img/w/${weather?.weather[0]?.icon}.png`}
        alt={weather?.weather[0]?.description}
      />
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default App;
