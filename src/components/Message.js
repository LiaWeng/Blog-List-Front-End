import React from 'react'
import { useSelector } from 'react-redux'

const Message = () => {
  const message = useSelector(state => state.message.content)
  const messageColor = useSelector(state => state.message.color)

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