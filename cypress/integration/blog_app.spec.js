const mainPage = 'http://localhost:3000'

describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user1 = {
      username: 'saminkhan1',
      name: 'Samin Khan',
      password: '12345'
    }
    const user2 = {
      username: 'saminkhan2',
      name: 'Samin Khan Copy',
      password: '12345'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user1)
    cy.request('POST', 'http://localhost:3003/api/users', user2)

    cy.visit(mainPage)
  })

  it('shows login form', () => {
    cy.contains('login to the application')
    cy.get('#username')
    cy.get('#password')
  })

  describe('Log in', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#username').type('saminkhan1')
      cy.get('#password').type('12345')
      cy.get('#loginButton').click()
      cy.contains('Samin Khan logged in')
    })

    it('fails with wrong credentials', () => {
      cy.get('#username').type('saminkhan')
      cy.get('#password').type('12345')
      cy.get('#loginButton').click()
      cy.get('#message')
        .should('contain', 'incorrect username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login('saminkhan1', '12345')
      cy.visit(mainPage)
    })

    it('can add a new blog', () => {
      cy.contains('add new blog').click()
      cy.get('#title').type('First class tests')
      cy.get('#author').type('Robert C. Martin')
      cy.get('#url').type('http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html')
      cy.get('#addBlogButton').click()
      cy.contains('First class tests -- Robert C. Martin')
    })

    describe.only('and several blogs exist', () => {
      beforeEach(() => {
        const blog1 = {
          title: 'TDD harms architecture',
          author: 'Robert C. Martin',
          url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
        }
        const blog2 = {
          title: 'Type wars',
          author: 'Robert C. Martin',
          url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html'
        }
        const blog3 = {
          title: 'Canonical string reduction',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
        }
        cy.addBlog(blog1)
        cy.addBlog(blog2)
        cy.addBlog(blog3)

        cy.visit('http://localhost:3000')
      })

      it('can like a blog', () => {
        cy.get('.viewButton:first').click()
        cy.get('.likeButton:first').click()
        cy.get('.numberOfLikes:first').should('contain', 1)
      })

      it('can delete a blog that the logged-in user created', () => {
        cy.get('.deleteButton:first').click()
        cy.get('html').should('not.contain', 'TDD harms architecture')
      })

      it('cannot delete a blog that other users created', () => {
        cy.contains('log out').click()
        cy.login('saminkhan2', '12345')
        cy.visit(mainPage)
        cy.get('.deleteButton:first').click()
        cy.get('#message')
          .should('contain', 'cannot delete this blog')
          .and('have.css', 'color', 'rgb(255, 0, 0)')
      })

      it('ranks blogs in order of likes', () => {
        cy.randomLikes(5)
        cy.get('.numberOfLikes')
          .invoke('text')
          .should(strOfLikes => {
            for (let i = 0; i < strOfLikes.length - 1; i ++) {
              if (strOfLikes[i] < strOfLikes[i + 1]) {
                let inOrder = false
                expect(inOrder).to.eq(true)
              }
            }
          })
      })
    })
  })
})