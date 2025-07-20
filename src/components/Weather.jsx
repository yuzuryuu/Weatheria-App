import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_day from '../assets/weather-icons-dev/production/fill/svg/clear-day.svg'
import clear_night from '../assets/weather-icons-dev/production/fill/svg/clear-night.svg'
import humidity from '../assets/weather-icons-dev/production/fill/svg/humidity.svg'
import feels_like from '../assets/weather-icons-dev/production/fill/svg/thermometer-celsius.svg'
import cloudy from '../assets/weather-icons-dev/production/fill/svg/cloudy.svg'
import partly_cloudy_day from '../assets/weather-icons-dev/production/fill/svg/partly-cloudy-day.svg'
import partly_cloudy_night from '../assets/weather-icons-dev/production/fill/svg/partly-cloudy-night.svg'
import overcast from '../assets/weather-icons-dev/production/fill/svg/overcast.svg'
import rain from '../assets/weather-icons-dev/production/fill/svg/rain.svg'
import partly_cloudy_day_rain from '../assets/weather-icons-dev/production/fill/svg/partly-cloudy-day-rain.svg'
import partly_cloudy_night_rain from '../assets/weather-icons-dev/production/fill/svg/partly-cloudy-night-rain.svg'
import thunderstorm_day from '../assets/weather-icons-dev/production/fill/svg/thunderstorms-day.svg'
import thunderstorm_night from '../assets/weather-icons-dev/production/fill/svg/thunderstorms-night.svg'
import snow from '../assets/weather-icons-dev/production/fill/svg/snowflake.svg'
import mist from '../assets/weather-icons-dev/production/fill/svg/mist.svg'

// const svgIcons = import.meta.glob('../assets/weather-icons-main/animated/*.svg', { eager: true });


const Weather = () => {

    const inputref = useRef();
    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": clear_day,
        "01n": clear_night,
        "02d": partly_cloudy_day,
        "02n": partly_cloudy_night,
        "03d": cloudy,
        "03n": cloudy,
        "04d": overcast,
        "04n": overcast,
        "09d": rain,
        "09n": rain,
        "10d": partly_cloudy_day_rain,
        "10n": partly_cloudy_night_rain,
        "11d": thunderstorm_day,
        "11n": thunderstorm_night,
        "13d": snow,
        "13n": snow,
        "50d": mist,
        "50n": mist
    }

    const search = async (city) => {
        if (city === "") {
            alert("Please enter a city name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            if (!response.ok) {
                alert(data.message);
            }

            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_day;
            setWeatherData({
                humidity: data.main.humidity,
                feels_like: Math.floor(data.main.feels_like),
                temperature: Math.floor(data.main.temp),
                location: data.name,
                description: data.weather[0].main,
                icon: icon
            })
        } catch (error) {
             setWeatherData(false);
            console.error("Error fetching weather data:", error);
        }
    }

    useEffect(() => { 
        search("Montreal");
    }, []);

  return (
      <div className='weather'>
        <div className='search-bar'>
            <input ref={inputref} type="text" placeholder="Search for a city..." onKeyDown={(e) => {if (e.key === 'Enter') {search(inputref.current.value);}}}/>
            <img src={search_icon} alt="" onClick={()=>search(inputref.current.value)}/>
          </div>
          
          {weatherData ? <>
              <img src={weatherData.icon} alt="" className='weather-icon' />
          <p className='temperature'>{weatherData.temperature}°C</p>
          <p className='location'>{weatherData.location}</p>
          {/* <p className='description'>Sunny</p> */}
          <div className="weather-data">
              <div className="col">
                  <img src={feels_like} alt="" />
                  <div>
                    <p>{weatherData.feels_like}°C</p>
                    <span>Feels Like</span>
                  </div>
              </div>
              <div className="col">
                  <img src={humidity} alt="" />
                  <div>
                      <p>{weatherData.humidity}%</p>
                    <span>Humidity</span>
                  </div>
              </div>
          </div>
          </> : <></>}
              
          
    </div>
  )
}

export default Weather
 