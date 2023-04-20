import {
  HTMLAttributeAnchorTarget, memo, useCallback, useMemo,
} from 'react';

import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';

import { useTranslation } from 'react-i18next';
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import classes from './ArticleList.module.scss';
import { Article, ArticleView } from '../../model/types/article';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
  onScrollEnd?: () => void;
}

const getSkeletons = (view: ArticleView) => {
  const skeletons = new Array(view === 'TABLE' ? 9 : 3)
    .fill(0)
    .map((_, index) => (
      <ArticleListItemSkeleton className={classes.card} view={view} key={index} />
    ));
  return (
    <>
      {skeletons}
    </>
  );
};

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    isLoading,
    view = 'TABLE',
    target,
    onScrollEnd,
  } = props;

  const { t } = useTranslation();

  const mods: Mods = useMemo(() => ({}), []);

  const renderItems = useCallback((index: number, article: Article) => (
    <ArticleListItem
      target={target}
      article={article}
      view={view}
      key={article.id}
      className={classes.card}
    />
  ), [target, view]);

  const Footer = useCallback(() => (
    <div
      className={classNames(classes.ArticleList, mods, [className, classes[view]])}
    >
      {isLoading && getSkeletons(view)}
    </div>
  ), [className, isLoading, mods, view]);

  if (!isLoading && articles.length === 0) {
    return (
      <div className={classNames(classes.ArticleList, mods, [className, classes[view]])}>
        <Text title={t('Articles not found')} />
      </div>
    );
  }

  if (view === 'LIST') {
    return (
      <Virtuoso
        // useWindowScroll
        // style={{ height: '100%' }}
        data={articles}
        // overscan={200}
        itemContent={renderItems}
        className={classNames(classes.ArticleList, mods, [className, classes[view]])}
        components={{ Footer }}
        endReached={onScrollEnd}
      />
    );
  }

  return (
    <VirtuosoGrid
      // useWindowScroll
      style={{ margin: '10px 0 0 0' }}
      data={articles}
      // overscan={200}
      itemContent={renderItems}
      listClassName={classNames(classes.ArticleList, mods, [className, classes[view]])}
      components={{ Footer }}
      endReached={onScrollEnd}
    />

  // <div className={classNames(classes.ArticleList, mods, [className, classes[view]])}>
  //   {articles.length > 0
  //     ? articles.map(renderArticle)
  //     : null}
  //   {isLoading && getSkeletons(view)}
  // </div>

  );
});
