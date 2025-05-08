import 'cypress-data-session'

const getToken = (): Cypress.Chainable<any> =>
  cy
    .api({
      method: 'GET',
      url: '/auth/fake-token'
    })
    .its('body.token')

const maybeGetToken = (sessionName: string): Cypress.Chainable<any> =>
  cy.dataSession({
    name: sessionName,

    validate: (): true => true,

    setup: getToken,

    shareAcrossSpecs: true
  })

Cypress.Commands.add('maybeGetToken', maybeGetToken)
