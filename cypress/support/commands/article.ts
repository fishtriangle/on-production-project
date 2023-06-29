import { Article } from '../../../src/entities/Article';

const articleMock = {
  title: 'Another news',
  subtitle: 'Другой пример статьи',
  image: 'https://www.syu-katu.net/wp-content/uploads/2019/08/ruby.jpg',
  views: 1997,
  createdAt: '23.12.2019',
  userId: '1',
  type: ['Science'],
  blocks: [],
};

export const createArticle = (article?: Article) => {
  const arg = article || articleMock;
  return cy
    .request({
      method: 'POST',
      url: 'http://[::1]:8888/articles',
      headers: {
        Authorization: 'testuser',
      },
      body: arg,
    })
    .then((resp) => resp.body.id);
};

export const removeArticle = (articleId: string) => {
  cy.request({
    method: 'DELETE',
    url: `http://[::1]:8888/articles/${articleId}`,
    headers: {
      Authorization: 'testuser',
    },
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      createArticle(article?: Article): Chainable<string>;
      removeArticle(articleId: string): Chainable<void>;
    }
  }
}
