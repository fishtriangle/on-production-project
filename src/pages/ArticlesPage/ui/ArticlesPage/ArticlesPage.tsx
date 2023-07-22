import { memo } from 'react';

import { ArticlePageGreeting } from '@/features/ArticlePageGreeting';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { Page } from '@/widgets/Page';

import classes from './ArticlesPage.module.scss';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import { ArticlePageInfiniteList } from '../ArticlePageInfiniteList/ArticlePageInfiniteList';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const mods: Mods = {};

  const content = (
    <ToggleFeatures
      featureName="isSiteRedesigned"
      on={
        <StickyContentLayout
          content={
            <Page
              data-testid="ArticlesPage"
              className={classNames(classes.ArticlesPageRedesigned, mods, [
                className,
              ])}
            >
              <ArticlePageInfiniteList />
              <ArticlePageGreeting />
            </Page>
          }
          left={
            <ViewSelectorContainer className={classes.ViewSelectorContainer} />
          }
          right={<FiltersContainer />}
        />
      }
      off={
        <Page
          data-testid="ArticlesPage"
          className={classNames(classes.ArticlesPage, mods, [className])}
        >
          <ArticlesPageFilters />
          <ArticlePageInfiniteList />
          <ArticlePageGreeting />
        </Page>
      }
    />
  );

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      {content}
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
