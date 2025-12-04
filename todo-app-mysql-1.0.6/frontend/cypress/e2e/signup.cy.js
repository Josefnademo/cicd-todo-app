describe('Signup Form', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('should display validation errors for empty fields', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('Vous devez renseigner ce champ').should('exist');
  });

  it('should show error if passwords do not match', () => {
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('Test@1234');
    cy.get('input[name="confirmation"]').type('WrongPass');
    cy.get('button[type="submit"]').click();
    cy.contains('Les mots de passe ne correspondent pas').should('exist');
  });

  it('should create a new user successfully', () => {
    cy.get('input[name="email"]').type(`user${Date.now()}@example.com`);
    cy.get('input[name="password"]').type('Test@1234');
    cy.get('input[name="confirmation"]').type('Test@1234');
    cy.get('button[type="submit"]').click();

    // Redirect to login page
    cy.url().should('eq', 'http://localhost:5173/login');
  });

  it('should display server error if email already exists', () => {
    const email = 'test_user@example.com'; // email already seeded
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type('Test@1234');
    cy.get('input[name="confirmation"]').type('Test@1234');
    cy.get('button[type="submit"]').click();
    cy.contains('An error occurred').should('exist'); // will be adjusted based on API message
  });
});
