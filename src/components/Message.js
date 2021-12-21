import React from 'react'

const Message = ({ message, messageColor }) => {
  const style = {
    color: messageColor,
    border: `1px solid ${messageColor}`
  }

  return (
    <div id='message' style={style}>
      {message}
    </div>
  )
}

export default Message