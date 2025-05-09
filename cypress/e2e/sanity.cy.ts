import { retryableBefore } from 'cy-retryable-before'

describe('CRUD movie', () => {
  let token: string
  retryableBefore(() => {
    cy.api({
      method: 'GET',
      url: '/'
    })
      .its('body.message')
      .should('eq', 'Server is running...')

    cy.maybeGetToken('token-session').then((t): void => {
      token = t
    })
  })

  it('should', () => {
    cy.log('say hello, this is your token')
    cy.log(token)
    cy.wrap(token).should('be.a', 'string')
  })
})
