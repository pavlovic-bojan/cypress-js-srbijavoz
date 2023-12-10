import passenger from '../fixtures/passenger.json'
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

    it('Validation of Train Selection with Attempted Registration', function() {
        cy.visit('https://webapi1.srbvoz.rs/ekarta/app/#!/home')
        cy.get('#stanicaod').should('be.visible').click()
        cy.get('.dropdown-menu.ng-isolate-scope').first().should('be.visible').wait(2000)
        cy.get('#stanicaod').clear().type('Novi')
        cy.get('a').contains('Novi Sad').click()
        cy.get('#stanicaod[uib-typeahead]').should('have.value', 'Novi Sad')
        cy.get('#stanicado').clear().type('Beo{enter}')
        cy.get('#stanicado[uib-typeahead]').should('have.value', 'Beograd Centar')
        cy.get('#brput').clear().type('3').should('have.value', '3')
        cy.get('#btntrazi').click()
        cy.get('h3[class="ng-binding"]').should('be.visible', 'have.text', 'Novi Sad - Beograd Centar ')
        cy.get('small[ng-click="detaljihide=!detaljihide"]').first().click()
        cy.get('small[ng-hide="detaljihide"]').first().should('be.visible', 'have.text', 'Zatvori ').click()
        cy.get('small[ng-hide="detaljihide"]').first().should('not.be.visible', 'have.text', 'Zatvori ')
        cy.get('div[class="btn btn-sv btn-izaberip"]').first().click()
        cy.get('div[class="btn  btn-izabrano"]').first().should('have.text', ' izabrano').and('have.css', 'background-color', 'rgb(14, 136, 12)')
        cy.get('div[class="btn btn-sv pull-right"]').eq(1).click();
        cy.get('#firstName').clear().type(passenger.name)
        cy.get('#lastName').clear().type(passenger.lastName)
        cy.get('select[ng-model="date"]').select(passenger.dayOfBirth)
        cy.get('select[ng-model="month"]').select(passenger.monthOfBirth)
        cy.get('select[ng-model="year"]').select(passenger.yearOfBirth)
        cy.get('div[ng-click="register()"]').should('have.attr', 'disabled')
    })

})