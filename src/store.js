import { configureStore } from '@reduxjs/toolkit'
import messageReducer from './reducers/messageReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'

const store = configureStore({
  reducer: {
    message: messageReducer,
    blogs: blogReducer,
    user: loginReducer
  }
})

export default store