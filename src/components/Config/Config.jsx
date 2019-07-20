import React from 'react'

import './Config.css'

class Config extends React.Component {
  constructor (props) {
    super(props)

    this.toggleOverlay = this.toggleOverlay.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onSave = this.onSave.bind(this)

    this.state = {
      showOverlay: false,
      name: props.name,
      city: props.city,
    }
  }

  toggleOverlay (event) {
    this.setState({
      showOverlay: !this.state.showOverlay
    })
  }

  onSave (event) {
    this.props.updateApp({...this.state})
  }

  onInputChange (event) {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

  render () {
    const {showOverlay, name, city} = this.state
    return (
      <div className={`Config ${!showOverlay ? 'hidden' : ''}`}>
        <div className={`button ${showOverlay ? 'active' : ''}`} onClick={this.toggleOverlay}>Configuration</div>
        <div className="overlay">
          <div>
            Name: <input type="text" value={name} name="name" onChange={this.onInputChange} />
          </div>
          <div>
            City: <input type="text" value={city} name="city" onChange={this.onInputChange} />
          </div>
          <div>
            <button onClick={this.onSave}>save</button>
          </div>
        </div>
      </div>

    )
  }
}

export default Config