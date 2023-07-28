import { HTMLAttributeAnchorTarget } from 'react';

import { Article, ArticleView } from '../../model/types/article';

export interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}
