describe('tasks for the Srbija Voz web app', () => {
    
    it('Click on "Prodaja karata" and perform URL & radio button validation', function() {
        cy.visit('https://srbijavoz.rs/', { timeout: 15000 })
        cy.get('[href="https://webapi1.srbvoz.rs/ekarta/app/#!/home"]').invoke('removeAttr', 'target').click()
        cy.origin('https://webapi1.srbvoz.rs/ekarta/app/#!/home', () => {
            cy.url().should('include', 'ekarta/app/#!/home')
            cy.get('#jedanSmer').should('be.visible').should('be.checked')
            cy.get('#povratna').should('be.visible').should('not.be.checked')
        })
    })

})