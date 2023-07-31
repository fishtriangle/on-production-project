import React, { Suspense } from 'react';

import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

import { ArticleRatingProps } from './ArticleRating';

const ArticleRatingComponent = React.lazy(() => import('./ArticleRating'));

const ArticleRatingLazy = (props: ArticleRatingProps) => (
  <Suspense fallback={<Skeleton height={140} width="100%" />}>
    <ArticleRatingComponent {...props} />
  </Suspense>
);

export { ArticleRatingLazy };
