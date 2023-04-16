import { HTMLAttributeAnchorTarget, memo } from 'react';

import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { ArticleListItemSkeleton } from 'entities/Article/ui/ArticleListItem/ArticleListItemSkeleton';
import { Text } from 'shared/ui/Text/Text';

import { useTranslation } from 'react-i18next';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import classes from './ArticleList.module.scss';
import { Article, ArticleView } from '../../model/types/article';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
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
    target,
  } = props;

  const { t } = useTranslation();

  const mods: Mods = {};

  const renderArticle = (article: Article) => (
    <ArticleListItem
      target={target}
      article={article}
      view={view}
      key={article.id}
      className={classes.card}
    />
  );

  if (!isLoading && articles.length === 0) {
    return (
      <div className={classNames(classes.ArticleList, mods, [className, classes[view]])}>
        <Text title={t('Articles not found')} />
      </div>
    );
  }

  return (
    <div className={classNames(classes.ArticleList, mods, [className, classes[view]])}>
      {articles.length > 0
        ? articles.map(renderArticle)
        : null}
      {isLoading && getSkeletons(view)}
    </div>
  );
});
