import React from 'react'
import './Time.css'

class Time extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      currentTime: new Date()
    }
  }
  
  componentDidMount () {
    setInterval(() => {
      this.setState({
        currentTime: new Date()
      })
    }, 1000)
  }

  render() {
    const { currentTime } = this.state
    return (
      <div className="Time">
        {this.modelCurrentTime(currentTime)}
      </div>
    )
  }

  modelCurrentTime(currentTime) {
    const hours = this.twoDigitNumber(currentTime.getHours())
    const minutes = this.twoDigitNumber(currentTime.getMinutes())
    const seconds = this.twoDigitNumber(currentTime.getSeconds())

    return `${hours}:${minutes}:${seconds}`
  }

  twoDigitNumber(num) {
    return num.toString().length <= 1 ? `0${num}` : num
  }
}

export default Time