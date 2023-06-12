import React, { Suspense } from 'react';
import { ProfileRatingProps } from './ProfileRating';
import { Skeleton } from '@/shared/ui/Skeleton';

const ProfileRatingComponent = React.lazy(() => import('./ProfileRating'));

const ProfileRatingLazy = (props: ProfileRatingProps) => (
  <Suspense fallback={<Skeleton height={140} width="100%" />}>
    <ProfileRatingComponent {...props} />
  </Suspense>
);

export { ProfileRatingLazy };
