describe('login page', () => {
    it('visit login page', () => {
        cy.visit('http://localhost:3000')

        cy.get('[data-testid=x_player_name]').click()
        cy.get('[data-testid=o_player_name]').click()
        cy.contains('Submit')
    })

    it('login without names', () => {
        cy.visit('http://localhost:3000')

        cy.get('[data-testid=x_player_name]').click()
        cy.get('[data-testid=o_player_name]').click()
        cy.contains('Submit').click()

        cy.contains('Loading')
    })

    it('login with names', () => {
        cy.visit('http://localhost:3000')

        cy.get('[data-testid=x_player_name]')
            .type('nikolai')
            .should('have.value', 'nikolai')
        cy.get('[data-testid=o_player_name]')
            .type('baskov')
            .should('have.value', 'baskov')
        cy.contains('Submit').click()

        cy.contains('Loading')
    })
})
