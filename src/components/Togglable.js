import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {
  const [visibility, setVisibility] = useState(false)

  const hiddenWhenVisible = { display: visibility ? 'none' : '' }
  const shownWhenVisible = { display: visibility ? '' : 'none' }

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <button
        style={hiddenWhenVisible}
        onClick={toggleVisibility}
      >
        {props.label}
      </button>
      <div style={shownWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>
          cancel
        </button>
      </div>
    </div>
  )
})

export default Togglable