import { useParams } from 'react-router-dom';
import React, { memo, Suspense } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { ArticleDetails } from '@/entities/Article';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { PageLoader } from '@/widgets/PageLoader';
import { Page } from '@/widgets/Page/ui/Page/Page';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { ArticleRating } from '@/features/ArticleRating';

import { ArticleDetailsPageComments } from '../ArticleDetailsPageComments/ArticleDetailsPageComments';
import { articleDetailsPageReducer } from '../../model/slices';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import classes from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { id } = useParams<{id: string}>();

  if (!id) {
    return null;
  }

  const mods: Mods = {};

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Suspense fallback={<PageLoader />}>
        <Page className={classNames(classes.ArticleDetailsPage, mods, [className])}>
          <ArticleDetailsPageHeader />
          <ArticleDetails id={id} />
          <ArticleRating articleId={id} />
          <ArticleRecommendationsList className={classes.recommendations} />
          <ArticleDetailsPageComments id={id} />
        </Page>
      </Suspense>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
