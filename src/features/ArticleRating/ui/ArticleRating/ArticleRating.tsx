import { memo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { RatingCard } from '@/entities/Rating';
import { getUserAuthData } from '@/entities/User';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Skeleton } from '@/shared/ui/Skeleton';

import {
  useGetArticleRatingsQuery,
  useRateArticleMutation,
} from '../../api/articleRatingApi';

export interface ArticleRatingProps {
  className?: string;
  articleId: string;
}

const ArticleRating = memo(({ className, articleId }: ArticleRatingProps) => {
  const { t } = useTranslation();

  const mods: Mods = {};

  const userData = useSelector(getUserAuthData);

  const { data, isLoading, refetch } = useGetArticleRatingsQuery({
    articleId,
    userId: userData?.id ?? '',
  });

  const [rateArticleMutation] = useRateArticleMutation();

  // const rating = (data?.reduce((acc, rate) => acc + (rate.rate || 0), 0) || 0) / (data?.length || 1);
  const rating = data?.[data.length - 1];

  const handleRateArticle = useCallback(
    (starsCount: number, feedback?: string) => {
      try {
        rateArticleMutation({
          articleId,
          userId: userData?.id ?? '',
          rate: starsCount,
          feedback: feedback ?? '',
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    },
    [articleId, rateArticleMutation, userData?.id],
  );

  const onCancel = useCallback(
    (starsCount: number) => {
      handleRateArticle(starsCount);
      refetch();
    },
    [handleRateArticle, refetch],
  );

  const onAccept = useCallback(
    (starsCount: number, feedback?: string) => {
      handleRateArticle(starsCount, feedback);
      refetch();
    },
    [handleRateArticle, refetch],
  );

  if (isLoading) {
    return <Skeleton width="100%" height={120} />;
  }

  return (
    <RatingCard
      onCancel={onCancel}
      onAccept={onAccept}
      rate={rating?.rate}
      className={classNames('', mods, [className])}
      title={
        rating?.rate
          ? t('Your rating for this article') || undefined
          : t('Rate the article') || undefined
      }
      feedbackTitle={t('Your feedback') || undefined}
      hasFeedback
    />
  );
});

export default ArticleRating;
