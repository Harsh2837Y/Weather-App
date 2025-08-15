import React, { useEffect, useRef, useState } from 'react'
import './Weather.css' 
import search_icon from '../assets/search.png' 
import clear_icon from '../assets/clear.png' 
import cloud_icon from '../assets/cloud.png' 
import drizzle_icon from '../assets/drizzle.png' 
import rain_icon from '../assets/rain.png' 
import snow_icon from '../assets/snow.png' 
import wid_icon from '../assets/wind.png' 
import humidity_icon from '../assets/humidity.png'

const Weather = () => {
  const inputRef = useRef()

  const [weatherData,setweatherData]=useState(false);

  const allIcons = {
    "01d":clear_icon,
    "01n": clear_icon,
    "02d":cloud_icon,
    "02n": cloud_icon,
    "03d":cloud_icon,
    "03n": cloud_icon,
    "04d":drizzle_icon,
    "04n": drizzle_icon,
    "09d":rain_icon,
    "09n": rain_icon,
    "10d":rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  }

  const search = async (city) => {
    if(city === ""){
      alert("Enter City Name");
      return;
    }
    try {
      const apikey = "aa7bbb275eac75bce9dba337f9572f98";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
      

      const response  = await fetch(url);
      const data = await response.json();
      
      if(!response.ok){
        alert(data.message);
        return;
      }
      
      console.log(data);
      const icon = allIcons[data.weather[0].icon ]|| clear_icon;
      setweatherData({
        humidity: data.main.humidity,
        windSpeed:data.wind.speed,
        temprature: Math.floor(data.main.temp),
        location: data.name,
        icon:icon
      })
    } catch (error) {
       setweatherData(false);
       console.error("Error in fetching weather data");
    }
  }  

  useEffect(()=>{
    search("Ahmedabad");
  },[])

  return (
    <div className='weather'>
    <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='search' />
        <img src={search_icon} alt=" Search Icon" onClick={()=>search(inputRef.current.value)}/>
    </div>
    {weatherData?<>
     <img src={weatherData.icon} alt="" className='weather-icon'/>
    <p className='temprature'>{weatherData.temprature}°C</p>
    <p className='location'>{weatherData.location}</p>
    <div className="weather-data">
      <img src={ humidity_icon} alt=" Humidity Icon" />
      <div>
        <p>{weatherData.humidity }%</p>
        <span>Humidity</span>
      </div>
    </div>
    <div className="weather-data">
      <img src={ wid_icon} alt=" Wind Icon" />
      <div>
        <p>{weatherData.windSpeed}km/h </p>
        <span>Wind Speed</span>
      </div>
    </div>
    </>:<></>}
   
    </div>
  )
}

export default Weather
