import { HTMLAttributeAnchorTarget, memo, useCallback, useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/depricated/Text';
import { HStack } from '@/shared/ui/redesigned/Stack';

import classes from './ArticleList.module.scss';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
  onScrollEnd?: () => void;
  virtualized?: boolean;
}

const getSkeletons = (view: ArticleView) => {
  const skeletons = new Array(view === 'TABLE' ? 9 : 3)
    .fill(0)
    .map((_, index) => (
      <ArticleListItemSkeleton
        className={classes.card}
        view={view}
        key={index}
      />
    ));
  return <>{skeletons}</>;
};

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    isLoading,
    view = 'TABLE',
    target,
    onScrollEnd,
    virtualized = false,
  } = props;

  const { t } = useTranslation();

  const mods: Mods = useMemo(() => ({}), []);

  const renderItems = useCallback(
    (index: number, article: Article) => (
      <ArticleListItem
        target={target}
        article={article}
        view={view}
        key={article.id}
        className={classes.card}
      />
    ),
    [target, view],
  );

  const Footer = useCallback(
    () => (
      <div
        className={classNames(classes.ArticleList, mods, [
          className,
          classes[view],
        ])}
      >
        {isLoading && getSkeletons(view)}
      </div>
    ),
    [className, isLoading, mods, view],
  );

  if (!isLoading && articles.length === 0) {
    return (
      <div
        className={classNames(classes.ArticleList, mods, [
          className,
          classes[view],
        ])}
      >
        <Text title={t('Articles not found') ?? ''} />
      </div>
    );
  }

  if (!virtualized) {
    return (
      <ToggleFeatures
        featureName="isSiteRedesigned"
        on={
          <HStack
            gap="16"
            className={classNames(classes.ArticleListRedesigned, mods, [])}
            data-testid="ArticlesList"
            wrap="wrap"
          >
            {articles.length > 0
              ? articles.map((article, index) => renderItems(index, article))
              : null}
            {isLoading && getSkeletons(view)}
          </HStack>
        }
        off={
          <HStack
            gap="32"
            className={classNames(classes.ArticleList, mods, [
              className,
              classes[view],
            ])}
            data-testid="ArticlesList"
          >
            {articles.length > 0
              ? articles.map((article, index) => renderItems(index, article))
              : null}
            {isLoading && getSkeletons(view)}
          </HStack>
        }
      />
    );
  }

  if (view === 'LIST') {
    return (
      <Virtuoso
        // useWindowScroll
        style={{ margin: 0 }}
        data={articles}
        // overscan={200}
        itemContent={renderItems}
        className={classNames(classes.ArticleList, mods, [
          className,
          classes[view],
        ])}
        components={{ Footer }}
        endReached={onScrollEnd}
        data-testid="ArticlesList"
      />
    );
  }

  if (articles) {
    return (
      <VirtuosoGrid
        // useWindowScroll
        style={{
          margin: '10px 0 0 0',
          // overflowY: 'hidden',
        }}
        data={articles}
        // overscan={200}
        itemContent={renderItems}
        listClassName={classNames(classes.ArticleList, mods, [
          className,
          classes[view],
        ])}
        components={{ Footer }}
        endReached={onScrollEnd}
        data-testid="ArticlesList"
      />
    );
  }

  return null;
});
