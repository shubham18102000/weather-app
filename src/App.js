import React, { useCallback, useEffect, useState } from "react";
import './App.css';
import SearchIcon from "@mui/icons-material/Search";
import DehazeIcon from "@mui/icons-material/Dehaze";
import VapingRoomsIcon from "@mui/icons-material/VapingRooms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmog, faCloud, faCloudRain } from "@fortawesome/free-solid-svg-icons";
import videoFile from './assets/1.mp4'; // Import video file

const WEATHER_API_KEY = 'ea2bba5a415fd3daa2bc83294cc1319f';

function App() {
  const [place, setPlace] = useState("dehradun");
  const [placeData, setPlaceData] = useState(null);
  const [error, setError] = useState(null);
  const currentTime = new Date().toLocaleDateString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    weekday: "short",
  });

  const getWeatherData = useCallback(async () => {
    if (place && place.length > 0) {
      try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${WEATHER_API_KEY}`;
        let res = await fetch(url);
        if (!res.ok) {
          // throw new Error('City not found. Please enter a valid city name.');
        }
        let data = await res.json();
        console.log("Get the Weather Data Response", data);
        setPlaceData(data);
        setError(null); // Clear any previous error
      } catch (err) {
        console.log(err);
        setError(err.message); // Set error state with the error message
        setPlaceData(null); // Clear weather data on error
      }
    }
  }, [place]);

  useEffect(() => {
    getWeatherData();
  }, [getWeatherData]);

  const handleSearch = () => {
    // Call getWeatherData to fetch data
    getWeatherData();
  };

  return (
    <div className="outerdiv">
      <video autoPlay loop muted className="background-video">
        <source src={videoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h1>Weather-App</h1>
      <div className="searchbar">
        <input
          type="input"
          placeholder="City Name"
          onChange={(e) => setPlace(e.target.value)}
        />
        <button onClick={handleSearch}>
          <SearchIcon />
        </button>
      </div>

     
      {error && (
        <p className="error-message">{error}</p>
      )}

      {/* Display weather data only if placeData exists and no error */}
      {placeData && placeData.weather && !error && (
        <div className="row">
          <div className="section1">
            <div className="section11">
              {placeData.weather[0].main === "Clouds" && (
                <FontAwesomeIcon className="weathericon" icon={faCloud} />
              )}
              {placeData.weather[0].main === "Haze" && (
                <DehazeIcon className="weathericon" />
              )}
              {placeData.weather[0].main === "Drizzle" && (
                <VapingRoomsIcon className="weathericon" />
              )}
              {placeData.weather[0].main === "Rain" && (
                <FontAwesomeIcon className="weathericon" icon={faCloudRain} />
              )}
              {placeData.weather[0].main === "Smog" && (
                <FontAwesomeIcon className="weathericon" icon={faSmog} />
              )}

              <p className="temperature">
                {(placeData?.main.temp - 273.15).toFixed(1)} <span>°C</span>
              </p>
            </div>
            <div className="section11"></div>
            <p className="city">{placeData?.name}</p>
            <p className="weathertype">{placeData?.weather[0].main}</p>
          </div>

          <div className="section2">
            <div className="section21">
              <p className="head1">Temperature</p>
              <p className="head2">{(placeData?.main.temp - 273.15).toFixed(1)}°C</p>
            </div>

            <div className="section21">
              <p className="head1">Temperature Min</p>
              <p className="head2">{(placeData?.main.temp_min - 273.15).toFixed(1)}°C</p>
            </div>

            <div className="section21">
              <p className="head1">Temperature Max</p>
              <p className="head2">{(placeData?.main.temp_max - 273.15).toFixed(1)}°C</p>
            </div>

            <div className="section21">
              <p className="head1">Humidity</p>
              <p className="head2">{placeData?.main.humidity}%</p>
            </div>

            <div className="section21">
              <p className="head1">Pressure</p>
              <p className="head2">{placeData?.main.pressure} hPa</p>
            </div>

            <div className="section21">
              <p className="head1">Wind Speed</p>
              <p className="head2">{(placeData?.wind.speed * 3.6).toFixed(2)} km/h</p>
            </div>
          </div>
        </div>
      )}

      <div className="timediv">
        <p className="time">Today Time: {currentTime}</p>
      </div>
      <div className="footer">
      <h2>@Shubham Chamoli</h2>
      </div>
    </div>
  );
}

export default App;
