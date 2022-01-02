import React from 'react'
import { Link } from 'react-router-dom'

import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

const Blogs = ({ blogs }) => {
  const sortedBlogs = [...blogs].sort((currentBlog, nextBlog) => {
    return nextBlog.likes - currentBlog.likes
  })

  return (
    <div style={{ marginTop: 20 }}>
      <TableContainer>
        <Table aria-label='table of blogs'>
          <TableHead>
            <TableRow>
              <TableCell>Blog Title</TableCell>
              <TableCell>Author</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedBlogs.map(blog =>
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title}
                  </Link>
                </TableCell>
                <TableCell>
                  {blog.author}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Blogs