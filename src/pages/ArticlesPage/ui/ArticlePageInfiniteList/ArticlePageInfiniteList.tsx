import { memo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ArticleList } from '@/entities/Article';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { getQueryParams } from '@/shared/lib/url/getQueryParams/getQueryParams';
import { Text, TextTheme } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';

import classes from './ArticlePageInfiniteList.module.scss';
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { getArticles } from '../../model/slices/articlesPageSlice';

interface ArticlePageInfiniteListProps {
  className?: string;
}

export const ArticlePageInfiniteList = memo(({ className }: ArticlePageInfiniteListProps) => {
  const { t } = useTranslation();

  const mods: Mods = {};

  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const error = useSelector(getArticlesPageError);
  const view = useSelector(getArticlesPageView);

  const onLoadNextPage = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(initArticlesPage(getQueryParams()));
  });

  if (error) {
    return (
      <Page>
        <Text title={t('Article loading error!')} theme={TextTheme.ERROR} />
      </Page>
    );
  }

  return (
    <ArticleList
      onScrollEnd={onLoadNextPage}
      isLoading={isLoading}
      articles={articles}
      view={view}
      className={classNames(classes.ArticlePageInfiniteList, mods, [className, classes.list])}
    />
  );
});
