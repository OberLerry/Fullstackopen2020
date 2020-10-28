import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [weather, setWeather] = useState({});
  const [selectedCountry, setSelectedCountry] = useState({});
  const api_key = process.env.REACT_APP_API_KEY;
  const fetchCountries = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  };
  useEffect(fetchCountries, []);

  const filteredCountries =
    filter === ""
      ? countries
      : countries.filter((country) =>
          country.name.toLowerCase().includes(filter.toLowerCase())
        );

  const weatherInfo = (country) => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
      )
      .then((response) => {
        console.log("weather fetched", response.data);
        setWeather(response.data);
      });
  };

  const countryInfo = () => {
    const wind =
      weather.current !== undefined
        ? `${weather.current.wind_speed} direction ${weather.current.wind_dir}`
        : "";
    return (
      <div>
        <h2>{selectedCountry.name}</h2>
        <div>capital {selectedCountry.capital}</div>
        <div>population {selectedCountry.population}</div>
        <h3>languages</h3>
        <ul>
          {selectedCountry.languages.map((language) => (
            <li key={language.iso639_1}>{language.name}</li>
          ))}
        </ul>
        <img alt="" src={selectedCountry.flag}></img>
        <h2>Weather in {selectedCountry.capital}</h2>
        <div>
          temperature{" "}
          {weather.current !== undefined
            ? weather.current.temperature
            : weather.success}
        </div>
        <div>
          {" "}
          {weather.current !== undefined ? (
            <img alt="" src={weather.current.weather_icons[0]}></img>
          ) : (
            ""
          )}
        </div>
        <div>wind: {weather.current !== undefined ? wind : ""}</div>
      </div>
    );
  };

  const handleCountrySelect = (country) => {
    weatherInfo(country);
    setSelectedCountry(country);
  };

  const displayInfo = (filteredCountries) => {
    if (filteredCountries.length > 10) {
      return "Too many countries, please specify";
    } else {
      if (Object.keys(selectedCountry).length === 0) {
        return filteredCountries.length === 1 ? (
          handleCountrySelect(filteredCountries[0])
        ) : (
          <ul>
            {filteredCountries.map((c) => (
              <li key={c.alpha3Code}>
                {c.name}{" "}
                <button onClick={() => handleCountrySelect(c)}>show</button>
              </li>
            ))}
          </ul>
        );
      } else {
        return countryInfo(selectedCountry);
      }
    }
  };

  const handleFilterChange = (event) => {
    setSelectedCountry({});
    setFilter(event.target.value);
  };

  return (
    <div>
      <div>
        {" "}
        Filter results{" "}
        <input value={filter} onChange={handleFilterChange}></input>
      </div>
      <h2>Countries</h2>
      {displayInfo(filteredCountries)}
    </div>
  );
}

export default App;
