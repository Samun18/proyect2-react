import React from 'react'
import { useState } from 'react'

const WeatherCard = ({weather, temp}) => {
    const [celsius, setCelsius] = useState(true)
    const handleChangeUnity = () => setCelsius(!celsius)
  return (
    <article className="container">
        <h1 className='container__title'>Weather App</h1>
        <h2 className='container__subt'>{weather?.name}, {weather?.sys.country}</h2>
        <div className='card'>
            <div className='card__img'>
                <img src={ weather &&
                `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
            </div>
            <section className='card__info'>
                <h3 className='card__info-title'>"{weather?.weather[0].description}"</h3>
                <ul className='card__info-list'>
                    <li>
                        <span>Wind speed: </span><span>{weather?.wind.speed} m/s</span>
                    </li>
                    <li>
                        <span>Clouds: </span><span>{weather?.clouds.all}%</span>
                    </li>
                    <li>
                        <span>Pressure: </span><span>{weather?.main.pressure} hPa</span>
                    </li>
                </ul>
            </section>
        </div>
        <h2 className='temp'>{celsius ? `${temp?.celsius}°C` : `${temp.farenheit}°F`}</h2>
        <button className='temp-btn' onClick={handleChangeUnity}>{celsius ? '°F' : '°C'}</button>
    </article>
  )
}

export default WeatherCard