import React from 'react'

import './Welcome.css'

class Welcome extends React.Component {
  render () {
    const {name} = this.props
    
    return (
      <div className="Welcome">
        Have a great day {name}! 
      </div>
    )
  }
}

export default Welcome