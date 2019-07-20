import React from 'react';
import './App.css';

import Time from '../Time/Time'
import Welcome from '../Welcome/Welcome'
import Weather from '../Weather/Weather'
import Config from '../Config/Config'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.updateApp = this.updateApp.bind(this)

    const city = this.loadLocalStorage('city')
    const name = this.loadLocalStorage('name')

    this.state = {
      city,
      name,
    }
  }

  updateApp({city, name}) {
    this.saveLocalStorage({city, name})
    this.setState({
      city, name
    })
  }

  saveLocalStorage (items) {
    Object.keys(items)
      .filter(key => items[key])
      .forEach(key => localStorage.setItem(key, items[key]))
  }
  
  loadLocalStorage (key) {
    return localStorage.getItem(key)
  }

  render () {
    const {city, name} = this.state

    return (
      <div className="App" style={{backgroundImage: `url(http://localhost:5000/background-image/${city})`}}>
        <div className="center">
          <div className="item">
            <Time />
            <Weather city={city} />
            <Welcome name={name} />
          </div>
          <div className="bottom">
            <Config updateApp={this.updateApp} city={city} name={name} />
          </div>
        </div>
      </div>
    )
  }

}

export default App;
