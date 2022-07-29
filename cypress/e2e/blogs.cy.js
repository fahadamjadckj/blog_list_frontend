
describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      cy.addUser()
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('login').click()
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
          cy.contains('login').click()
          cy.get('input:first').type('fahad')
          cy.get('input:last').type('fahad')
          cy.get('.login').click()
        })
    
        it('fails with wrong credentials', function() {
            cy.get('.logout').click()
            cy.contains('login').click()
            cy.get('input:first').type('zebra')
            cy.get('input:last').type('fahad')
            cy.get('.login').click()
            cy.contains('wrong credentials')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
          // log in user here
          cy.visit('http://localhost:3000')
          cy.login()
        })
    
        it('A blog can be created', function() {
          // ...
          cy.contains('new blog').click()
          cy.get('#title').type('Blog by cypress')
          cy.get('#author').type('cypress')
          cy.get('#url').type('wikipedia.com')
          cy.get('#send').click()
          cy.contains('Blog by cypress')
        })

        it('user can like the blog', function() {
            cy.contains('new blog').click()
            cy.get('#title').type('Blog by cypress')
            cy.get('#author').type('cypress')
            cy.get('#url').type('wikipedia.com')
            cy.get('#send').click()
            cy.contains('Blog by cypress')
            cy.contains('show').click()
            cy.contains('likes 0')
            cy.get('.addlike').click()
            cy.contains('likes 1')
        })

        it('a user can delete the blog', async function() {
            cy.addBlog({
            title: 'Blog by cypress',
            author: 'cypress',
            url: 'www.wikipedia.com',
            likes: 15
            })
            cy.visit('http://localhost:3000')
            cy.contains('Blog by cypress')
            cy.contains('show').click()
            await cy.contains('remove').click()
            cy.contains('deleted')
        })

        it('tests are sorted by likes', () => {
            cy.addBlog({
                title: 'cypress 1',
                author: 'cypress',
                url: 'www.wikipedia.com',
                likes: 15
            })
            cy.addBlog({
                title: 'cypress 2',
                author: 'cypress',
                url: 'www.wikipedia.com',
                likes: 10
            })
            cy.addBlog({
                title: 'cypress 3',
                author: 'cypress',
                url: 'www.wikipedia.com',
                likes: 20
            })
            cy.visit('http://localhost:3000')
            cy.get('.blog-less').eq(0).should('contain', 'cypress 3')
            cy.get('.blog-less').eq(1).should('contain', 'cypress 1')
            cy.get('.blog-less').eq(2).should('contain', 'cypress 2')

        })
    })
  })