import { memo } from 'react';

import { classNames, Mods } from 'shared/lib/classNames/classNames';

import { ArticleListItemSkeleton } from 'entities/Article/ui/ArticleListItem/ArticleListItemSkeleton';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import classes from './ArticleList.module.scss';
import { Article, ArticleView } from '../../model/types/article';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
}

const getSkeletons = (view: ArticleView) => new Array(view === 'TABLE' ? 9 : 3)
  .fill(0)
  .map((_, index) => (
    <ArticleListItemSkeleton className={classes.card} view={view} key={index} />
  ));

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    isLoading,
    view = 'TABLE',
  } = props;

  const mods: Mods = {};

  if (isLoading) {
    return (
      <div className={classNames(classes.ArticleList, mods, [className, classes[view]])}>
        {getSkeletons(view)}
      </div>
    );
  }

  const renderArticle = (article: Article) => (
    <ArticleListItem article={article} view={view} key={article.id} className={classes.card} />
  );

  return (
    <div className={classNames(classes.ArticleList, mods, [className, classes[view]])}>
      {articles.length > 0
        ? articles.map(renderArticle)
        : null}
    </div>
  );
});
