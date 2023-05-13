import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { getQueryParams } from '@/shared/lib/url/getQueryParams/getQueryParams';
import { ArticleList } from '@/entities/Article';
import { Page } from '@/widgets/Page';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { getArticles } from '../../model/slices/articlesPageSlice';
import classes from './ArticlePageInfiniteList.module.scss';

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
