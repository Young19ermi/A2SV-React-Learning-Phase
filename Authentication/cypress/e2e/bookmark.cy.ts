describe('Favorite Bookmarks Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://akil-backend.onrender.com/bookmarks', {
      statusCode: 200,
      body: {
        data: [
          {
            id: '1',
            logoUrl: 'https://example.com/logo1.png',
            title: 'Software Engineer',
            orgName: 'Tech Company',
            dateBookmarked: '2024-08-01T00:00:00Z',
            opType: 'Full-Time',
          },
        ],
      },
    }).as('getBookmarks');

    cy.intercept('GET', '/api/auth/session', {
      statusCode: 200,
      body: {
        user: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          accessToken: 'mockedAccessToken',
        },
        expires: '9999-12-31T23:59:59Z',
      },
    });

    cy.visit('/favorites');
  });

  it('should display the fetched bookmarks', () => {
    cy.wait('@getBookmarks');

    cy.get('[data-testid="bookmark-0"]').within(() => {
      cy.get('[data-testid="bookmark-logo-0"]').should('have.attr', 'src', 'https://example.com/logo1.png');
      cy.get('[data-testid="bookmark-title-0"]').should('have.text', 'Software Engineer');
      cy.get('[data-testid="bookmark-orgname-0"]').should('have.text', 'Tech Company');
      cy.get('[data-testid="bookmark-date-0"]').should('have.text', '8/1/2024');
      cy.get('[data-testid="bookmark-optype-0"]').should('have.text', 'Full-Time');
    });

  });
});
