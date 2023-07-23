import '../support/commands'

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    const user = {
      name: 'Micky Mouse',
      username: 'Tester1',
      password: '123'
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('Login to application')
    cy.contains('username:')
    cy.contains('password')
    cy.contains('login').click()
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('Tester1')
      cy.get('#password').type('123')
      cy.get('#login-button').click()

      cy.contains('Micky Mouse logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('Tester1')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Wrong username or password!')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Micky Mouse logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Tester1', password: '123' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('One Piece')
      cy.get('#author').type('Eiichiro Oda')
      cy.get('#url').type('https://www.netflix.com/sg/title/80217863')
      cy.get('#create-button').click()
      cy.contains('One Piece by Eiichiro Oda')
    })

    describe('A blog exists', function () {
      beforeEach(function () {
        const body = {
          title : 'Game',
          author: 'On',
          url: 'www.gameon.com',
          likes: 5
        }
        cy.createBlog(body)
      })

      it('User can like a blog', function () {
        cy.contains('view').click()
        cy.get('#like-button').click()
      })

      it('User who created the blog can delete it', function() {
        cy.contains('view').click()
        cy.get('#delete-button').click()
        cy.on('window:confirm', () => true)
      })

      // // The blog page already only displays the blogs created by the user
      // it('User who did not created the blog cannot delete it', function() {})

      describe('Blogs are ordered according to likes in descending order', function() {
        beforeEach(function() {
          const blog1 = {
            title : 'test1',
            author: 'tester1',
            url: 'www.test.com',
            likes: 20
          }

          const blog2 = {
            title : 'test2',
            author: 'tester2',
            url: 'www.test.com',
            likes: 10
          }

          const blog3 = {
            title : 'test3',
            author: 'tester3',
            url: 'www.test.com',
            likes: 30
          }

          cy.createBlog(blog1)
          cy.createBlog(blog2)
          cy.createBlog(blog3)
        })

        it('First blog with the most likes', function(){
          cy.get('.title').eq(0).should('contain', 'test3')
          cy.get('.title').eq(1).should('contain', 'test1')
          cy.get('.title').eq(2).should('contain', 'test2')
          cy.get('.title').eq(3).should('contain', 'Game')
        })
      })
    })
  })
})
