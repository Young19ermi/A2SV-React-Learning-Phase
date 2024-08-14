describe('JobCard Component', () => {
    beforeEach(() => {
      cy.intercept('GET', 'https://akil-backend.onrender.com/opportunities/search',{
        statusCode: 200,
        body: {
          data: [
            {
                id: '1',
                logoUrl: 'https://example.com/logo.png',
                title: 'Software Engineer',
                orgName: 'Tech Company',
                location: ['New York'],
                description: 'A great job opportunity.',
                opType: 'Full-Time',
                categories: ['Engineering', 'Software'],
                isBookmarked: false,
            },
          ],
        },
      }).as('getJob');

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
  
      cy.visit('/');
    });
  
    it('should display job details correctly', () => {
      cy.wait('@getJob', { timeout: 10000 });
  
      cy.get('[data-testid="job-link"]').should('exist');
      cy.get('[data-testid="job-logo"]').should('have.attr', 'src', 'https://example.com/logo.png');
      cy.get('[data-testid="job-title"]').should('have.text', 'Software Engineer');
      cy.get('[data-testid="job-org"]').should('have.text', 'Tech Company');
      cy.get('[data-testid="job-location"]').should('have.text', 'New York');
      cy.get('[data-testid="job-description"]').should('have.text', 'A great job opportunity.');
      cy.get('[data-testid="job-opType"]').should('have.text', 'Full-Time');
    });



    it('should allow bookmarking a job', () => {
        cy.wait('@getJob', { timeout: 10000 });
    
        cy.get('[data-testid="bookmark-icon"]').should('exist');
    
        cy.intercept('POST', 'https://akil-backend.onrender.com/bookmarks/1', {
          statusCode: 200,
        }).as('addBookmark');
    
        cy.get('[data-testid="bookmark-icon"]').click();
    
        cy.wait('@addBookmark', { timeout: 10000 });
    
        cy.get('[data-testid="bookmarked-icon"]').should('exist');
        cy.intercept('DELETE', 'https://akil-backend.onrender.com/bookmarks/1', {
          statusCode: 200,
        }).as('deleteBookmark');
    
        cy.get('[data-testid="bookmarked-icon"]').click();
    
        cy.wait('@deleteBookmark', { timeout: 10000 });
    
        cy.get('[data-testid="bookmark-icon"]').should('exist');
      });
    
  });
  