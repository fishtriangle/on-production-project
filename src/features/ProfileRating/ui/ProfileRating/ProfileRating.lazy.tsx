import React, { Suspense } from 'react';

import { Skeleton } from '@/shared/ui/Skeleton';

import { ProfileRatingProps } from './ProfileRating';

const ProfileRatingComponent = React.lazy(() => import('./ProfileRating'));

const ProfileRatingLazy = (props: ProfileRatingProps) => (
  <Suspense fallback={<Skeleton height={140} width="100%" />}>
    <ProfileRatingComponent {...props} />
  </Suspense>
);

export { ProfileRatingLazy };
