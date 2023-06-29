let currentArticleId: string = '';

describe('User visit Article page', () => {
  beforeEach(() => {
    cy.login().then(() => {
      cy.createArticle().then((articleId) => {
        currentArticleId = articleId;
        cy.visit(`/articles/${currentArticleId}`);
      });
    });
  });

  afterEach(() => {
    if (currentArticleId) {
      cy.removeArticle(currentArticleId);
    }
  });

  it('Page successfully loads', () => {
    cy.getByTestId('ArticleDetails.title').should('exist');
  });

  it('List of recommendations successfully loads', () => {
    cy.getByTestId('ArticleRecommendationsList').should('exist');
  });

  it('Create comment', () => {
    cy.getByTestId('ArticleDetails.title').should('exist');
    cy.getByTestId('AddNewCommentForm').scrollIntoView();
    cy.addNewComment('New text');
    cy.getByTestId('CommentCard.content').should('have.length', 1);
  });

  it('Rate for the article', () => {
    cy.getByTestId('ArticleDetails.title').should('exist');
    cy.getByTestId('RatingCard').scrollIntoView();
    cy.setRate(5, 'New feedback');
    cy.get('[data-selected=true]').should('have.length', 5);
  });

  it('Rate for the article with stubs (fixtures)', () => {
    cy.intercept('GET', '**/articles/**', { fixture: 'article-details.json' });
    cy.getByTestId('ArticleDetails.title').should('exist');
    cy.getByTestId('RatingCard').scrollIntoView();
    cy.setRate(5, 'New feedback');
    cy.get('[data-selected=true]').should('have.length', 5);
  });
});
