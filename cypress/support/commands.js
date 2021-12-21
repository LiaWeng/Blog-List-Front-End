Cypress.Commands.add('login', (username, password) => {
  const user = { username, password }
  cy.request('POST', 'http://localhost:3003/api/login', user)
    .then(response => {window.localStorage.setItem('loggedUser', JSON.stringify(response.body))})
})

Cypress.Commands.add('addBlog', (blog) => {
  const user = JSON.parse(window.localStorage.getItem('loggedUser'))

  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    body: {
      title: blog.title,
      author: blog.author,
      url: blog.url,
    },
    headers: {
      'Authorization': `bearer ${user.token}`
    }
  })
})

Cypress.Commands.add('likeBlog', (blogToLike) => {
  cy.get(blogToLike).within(() => {
    cy.get('.viewButton').click()
    cy.get('.likeButton').click()
    cy.get('.viewButton').click()
  })
})

Cypress.Commands.add('randomLikes', (numberOfLikes) => {
  const getRandomInt = () => {
    return Math.floor(Math.random() * 3)
  }

  cy.get('.blogItem')
    .then(blogItem => {
      for (let i = 0; i < numberOfLikes; i ++) {
        let indexToLike = getRandomInt(3)
        cy.likeBlog(blogItem[indexToLike])
      }
    })
})

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
