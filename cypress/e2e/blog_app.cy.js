describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.login({ username: 'mluukkai', password: 'mluukkai' })
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function() {

    cy.contains('blogs')

  })
  it('login form is shown', function() {

    cy.contains('login')
  })
  it('user can login', function () {

    cy.get('input:first').type('mluukkai')
    cy.get('input:last').type('mluukkai')
    cy.contains('login').click()
  })
  it('fails with wrong credentials', function () {

    cy.get('input:first').type('mluukkai')
    cy.get('input:last').type('zzzzzz')
    cy.contains('login').click()
    cy.contains('log in to application')
  })

  describe('when alredy logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'mluukkai' })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#blogTitle').type('testi')
      cy.get('#blogAuthor').type('testi')
      cy.get('#blogUrl').type('testi')
      cy.contains('create').click()
      cy.contains('a new blog testi by testi added')
    })
    describe('and a blog exists', function () {
      beforeEach(function () {
        const blog= {
          title: 'testi2',
          author: 'testi2',
          url: 'testi2',
          likes: 0
        }
        cy.createBlog({
          content: { blog }
        })
      })
      it('you can like a blog', function () {
        cy.contains('testi2').parent().find('button').click()
        cy.contains('second note').parent().find('button')
          .should('contain', 'like')
      })
      it('you can remove a blog', function () {
        cy.contains('testi2').parent().find('button').click()
        cy.contains('second note').parent().find('button')
          .should('contain', 'remove').click()
      })

      it ('Blogs are in the order of likes', function (){
        const blog3= {
          title: 'testi3',
          author: 'testi3',
          url: 'testi3',
          likes: 3
        }
        cy.createBlog({
          content: { blog3 }
        })

        cy.get('.blog').eq(0).should('contain', 'testi3')
      })
    })
  })

})