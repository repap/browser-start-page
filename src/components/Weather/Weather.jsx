import React from 'react'

import './Weather.css'

class Weather extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      weather: {}
    }
  }

  componentDidUpdate () {
    if(this.props.city !== this.state.weather.city) {
      this.fetchWeather(this.props.city)
    }
  }

  componentDidMount () {
    const {city} = this.props
    this.fetchWeather(city)
  }

  fetchWeather (city) {
    fetch(`http://localhost:5000/weather/${city}`, {
      method: 'GET',
      cors: 'cors'
    })
      .then(res => res.json())
      .then(data =>
        this.setState({
          weather: {
            city: data.name,
            temp: Math.round(data.main.temp),
            icon: data.weather[0].icon
          }
        }))
      .catch(console.error)
  }

  render () {
    const {icon, temp, city} = this.state.weather
    
    if(!icon || !temp || !city ) {
      return (
        <div></div>
      )
    }

    return (
      <div className="Weather">
        {city}, {temp}°C, <span><img alt="weather icon" src={`http://openweathermap.org/img/wn/${icon}.png`} /></span>
      </div>
    )
  }
}

export default Weather