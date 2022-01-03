import loginService from '../services/login'
import { messageAction } from './messageReducer'

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default: return state
  }
}

export const loginAction = (credentials) => {
  return async (dispatch) => {
    try {
      const loggedUser = await loginService.login(credentials)
      dispatch({
        type: 'LOGIN',
        data: loggedUser
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(loggedUser)
      )
    } catch (error) {
      dispatch(messageAction('Invalid username or password', 'FAIL'))
    }
  }
}

export const logoutAction = () => {
  return {
    type: 'LOGOUT'
  }
}

export default loginReducer