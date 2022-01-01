import React from 'react'
import { useParams } from 'react-router-dom'

const IndividualUser = ({ users }) => {
  const params = useParams()

  if (users.length === 0) {
    return null
  }

  const user = users.find(user => user.id === params.userId)

  return (
    <div>
      <h2>blogs added by {user.name}</h2>
      <ul>
        {user.blog.map(blog =>
          <li key={blog.id}>{blog.title}</li>)
        }
      </ul>
    </div>
  )
}

export default IndividualUser