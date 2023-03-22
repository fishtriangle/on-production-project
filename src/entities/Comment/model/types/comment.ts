import { User } from 'entities/User';
// import { Article } from 'entities/Article';

export interface Comment {
  id: string;
  text: string;
  // articleId: Article;
  user: User;
}
