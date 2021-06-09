/// <reference types="cypress" />
describe('Movies List App', () => {

  /**
   * NOTE FROM DENYS: I later realised, I needed to create some fixtures for http requests, 
   * and set cypress interceptors for http calls so I can test business logic against a static response
   * but too late, so I'll submit what I have and we can go over it during the call =) 
   */
  
  describe('Genre filter', () => {
    const ACTION = 'Action'
    const DRAMA = 'Drama'

    beforeEach( async() => {
      await cy.visit(`/?genre=${ACTION}`)
    })

    it('Should render filtered movie list on initial pageload', () => {
      // check visual indicators
      cy.get('.v-list').contains('.v-list-item__title', ACTION).parents().should('have.class', 'active')
      cy.contains('span.genre', ACTION)
      // check movie list
      cy.get('.movie-list').children().then(children => {
        let pageMoviesCount = children.length
        cy.get('.movie-list').find(`.v-chip__content:contains(${ACTION})`).should('have.length', pageMoviesCount)
      })
    })

    it('Should render filtered movie list when sidebar item is clicked', () => {
      // check visual indicators
      cy.get('.v-list').contains('.v-list-item__title', DRAMA).should('not.have.class', 'active')
      cy.get('.v-list').contains('.v-list-item__title', DRAMA).click()
      cy.url().should('include', `genre=${DRAMA}`)
      cy.get('.v-list').contains('.v-list-item__title', DRAMA).parents().should('have.class', 'active')
      cy.contains('span.genre', DRAMA)
      // check movie list
      cy.get('.movie-list').children().then(children => {
        let pageMoviesCount = children.length
        cy.get('.movie-list').find(`.v-chip__content:contains(${DRAMA})`).should('have.length', pageMoviesCount)
      })
      
    })
  })

  describe('Pagination', () => {
    const PAGENUM = 4
    beforeEach( async() => {
      await cy.visit(`/?page=${PAGENUM}`)
    })

    it('Should render movie list page on initial page load', () => {
      cy.get('.v-pagination__item').contains(PAGENUM).should('have.class', 'v-pagination__item--active')
    })
    it('Should switch movie list page on pagination click', () => {
      cy.get('.v-pagination__item').contains(PAGENUM + 3).click()
      cy.get('.v-pagination__item').contains(PAGENUM + 3).should('have.class', 'v-pagination__item--active')
    })
  })

})