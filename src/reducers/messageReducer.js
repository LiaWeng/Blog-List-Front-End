const messageReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return {
        content: action.data,
        severity: 'success'
      }
    case 'FAIL':
      return {
        content: action.data,
        severity: 'error'
      }
    case 'NO_MESSAGE':
      return null
    default:
      return state
  }
}

export const messageAction = (content, messageCase) => {
  return (dispatch) => {
    dispatch({
      type: messageCase,
      data: content
    })
    setTimeout(() => {
      dispatch({ type: 'NO_MESSAGE' })
    }, 4000)
  }
}

export default messageReducer