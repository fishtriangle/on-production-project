import { memo } from 'react';

import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from 'widgets/Page/ui/Page/Page';

import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import classes from './ArticlesPage.module.scss';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import { ArticlePageInfiniteList } from '../ArticlePageInfiniteList/ArticlePageInfiniteList';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const mods: Mods = {};

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page
        className={classNames(classes.ArticlesPage, mods, [className])}
      >
        <ArticlesPageFilters />
        <ArticlePageInfiniteList />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
