describe('actions with board', () => {
    let x_name = 'jojo'
    let o_name = 'rabbit'

    beforeEach('login', () => {
        cy.visit('http://localhost:3000')

        cy.get('[data-testid=x_player_name]')
            .type(x_name)
            .should('have.value', x_name)
        cy.get('[data-testid=o_player_name]')
            .type(o_name)
            .should('have.value', o_name)
        cy.contains('Submit').click()
    })

    it('render', () => {
        cy.contains(x_name)
        cy.contains(o_name)
    })

    it('players make steps', () => {
        cy.contains('Next player: ' + x_name + ' (X)')
        cy.get('[data-testid=4]')
            .click()
            .contains('X')

        cy.contains('Next player: ' + o_name + ' (O)')
        cy.get('[data-testid=5]')
            .click()
            .contains('O')

        cy.contains('Next player: ' + x_name + ' (X)')
    })

    it('check double click to square', () => {
        cy.contains('Next player: ' + x_name + ' (X)')
        cy.get('[data-testid=2]')
            .click()
            .contains('X')

        cy.contains('Next player: ' + o_name + ' (O)')
        cy.get('[data-testid=2]')
            .click()
            .contains('X')

        cy.contains('Next player: ' + o_name + ' (O)')
    })

    it('play with win strategy', () => {
        cy.get('[data-testid=2]').click()
        cy.get('[data-testid=6]').click()
        cy.get('[data-testid=0]').click()
        cy.get('[data-testid=1]').click()
        cy.get('[data-testid=8]').click()
        cy.get('[data-testid=5]').click()
        cy.get('[data-testid=4]').click()

        const values = ['X', 'O', 'X', '', 'X', 'O', 'O', '', 'X']
        for (let i = 0; i < 9; i++) {
            const key = '[data-testid=' + i.toString() + ']'
            cy.get(key).should('contain', values[i])
        }

        cy.contains('Winner is ' + x_name + ' (X)')
        cy.contains('Winner is ' + x_name + ' (X)')

        cy.contains('Finish')
        cy.contains('Repeat')
    })
})
