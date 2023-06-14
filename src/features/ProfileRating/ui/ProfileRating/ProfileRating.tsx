import { memo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { RatingCard } from '@/entities/Rating';
import { getUserAuthData } from '@/entities/User';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Skeleton } from '@/shared/ui/Skeleton';

import {
  useGetProfileRatingsQuery,
  useRateProfileMutation,
} from '../../api/profileRatingApi';

export interface ProfileRatingProps {
  className?: string;
  profileId: string;
}

const ProfileRating = memo(({ className, profileId }: ProfileRatingProps) => {
  const { t } = useTranslation();

  const mods: Mods = {};

  const userData = useSelector(getUserAuthData);

  const { data, isLoading, refetch } = useGetProfileRatingsQuery({
    profileId,
    userId: userData?.id ?? '',
  });

  const [rateProfileMutation] = useRateProfileMutation();

  const rating = data?.[data.length - 1];

  const handleRateProfile = useCallback((starsCount: number, feedback?: string) => {
    try {
      rateProfileMutation({
        profileId,
        userId: userData?.id ?? '',
        rate: starsCount,
        feedback: feedback ?? '',
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [profileId, rateProfileMutation, userData?.id]);

  const onCancel = useCallback((starsCount: number) => {
    handleRateProfile(starsCount);
    refetch();
  }, [handleRateProfile, refetch]);

  const onAccept = useCallback((starsCount: number, feedback?: string) => {
    handleRateProfile(starsCount, feedback);
    refetch();
  }, [handleRateProfile, refetch]);

  if (isLoading) {
    return <Skeleton width="100%" height={120} />;
  }

  return (
    <RatingCard
      onCancel={onCancel}
      onAccept={onAccept}
      rate={rating?.rate}
      className={classNames('', mods, [className])}
      title={rating?.rate ? t('Your rating for this profile') || undefined : t('Rate the profile') || undefined}
      feedbackTitle={t('Your feedback') || undefined}
      hasFeedback
    />
  );
});

export default ProfileRating;
