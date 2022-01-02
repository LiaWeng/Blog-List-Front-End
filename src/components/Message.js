/* eslint-disable react-redux/useSelector-prefer-selectors */
import React from 'react'
import { useSelector } from 'react-redux'

import Alert from '@mui/material/Alert'

const Message = () => {
  const message = useSelector(state => state.message.content)
  const severity = useSelector(state => state.message.severity)

  return (
    <div style={{ marginTop: 20 }}>
      {message && <Alert severity={severity} id='message'>
        {message}
      </Alert>
      }
    </div>

  )
}

export default Message