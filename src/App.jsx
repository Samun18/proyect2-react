import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import Loader from "./components/Loader";
import Denied from "./components/Denied";

function App() {
  const [position, setPosition] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [isLoading, setIsLoading] = useState(true)
  const [ubicationDenied, setubicationDenied] = useState(true)
  
  
  useEffect(() => {
    const success = (pos) => {
      setubicationDenied(true)
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      setPosition(obj);
    };
    const error = err => {
      console.log(err)
      setubicationDenied(false)
    };
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  useEffect(() => {
    if (position) {
      
      const apiKey = "e6e5c909a068b4022da94490fe85849e";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lon}&appid=${apiKey}`;

      setIsLoading(true)
      axios.get(url)
        .then((res) => {
          setWeather(res.data);
          const obj = {
            celsius: (res.data.main.temp - 273.15).toFixed(1),
            farenheit: (((res.data.main.temp - 273.15) * 9) / 5 + 32).toFixed(1)
          };
          setTemp(obj)
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false))
    } 
  }, [position]);
  console.log(weather);
  
  return (
    <>
    <div className="origin">
      {
        ubicationDenied 
          ?  isLoading 
            ? <Loader/>
            : <WeatherCard 
            weather={weather} 
            temp={temp}
            />
          : <Denied/>
      }
      </div>
    </>
  );
}

export default App;
