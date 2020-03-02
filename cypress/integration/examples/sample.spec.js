describe('Navigates to Expected URL', () => {
  it('Goes to About Page from Home Page', () => {
    cy.visit('/');
    cy.contains('About').click();

    cy.url().should('include', '/about');
  });
});

describe('Loggin in', () => {
  it('Displays a login form if you are not signed in.', () => {
    cy.visit('/');
    cy.contains('Log in here');
    cy.get('[data-cy=login-form]');
  });

  it('Types into the correct form', () => {
    cy.visit('/');
    cy.get('#email')
      .type('russell@rwm.com')
      .should('have.value', 'russell@rwm.com');
    cy.get('#password')
      .type('secret')
      .should('have.value', 'secret');
  });
});

describe('Login Functionality', () => {
  it('Goes to tasks URL when given correct username and PW', () => {
    // cy.visit('/');
    // cy.get('#email').type('r@r.com');

    // cy.get('#password').type('123');
    // cy.get('#login-submit').click();
    cy.login('r@r.com', '123');

    cy.url().should('include', '/tasks');
  });

  it('Gives error message for wrong credentials', () => {
    cy.visit('/');
    cy.get('#email').type('r@r.com');

    cy.get('#password').type('321');
    cy.get('#login-submit').click();

    cy.contains('Wrong Username or Password');
  });
});
