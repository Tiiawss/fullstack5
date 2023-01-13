import React from 'react'
import PropTypes from 'prop-types'

const Notification = (props) => {
  const notificationStyle = {
    fontSize: 16,
    color: 'purple',
    background: 'lightgray',
    borderRadius: 8,
    borderStyle: 'solid',
    padding: 6,
    marginBottom: 11,
  }
  const errorStyle = { ...notificationStyle, color: 'red' }

  return (
    <div className="error" style={props.message.error ?
      errorStyle : notificationStyle} >
      {props.message.text}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.object.isRequired
}

export default Notification