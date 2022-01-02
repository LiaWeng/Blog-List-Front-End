import React from 'react'
import { Link, useParams } from 'react-router-dom'

const IndividualUser = ({ users }) => {
  const params = useParams()

  if (users.length === 0) {
    return null
  }

  const user = users.find(user => user.id === params.userId)

  return (
    <div>
      <h2>Blogs added by {user.name}</h2>
      <ul>
        {user.blog.map(blog =>
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </li>)
        }
      </ul>
    </div>
  )
}

export default IndividualUser