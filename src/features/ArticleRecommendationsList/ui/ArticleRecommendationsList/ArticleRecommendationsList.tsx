import React, { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { ArticleList } from '@/entities/Article';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { Text, TextSize, TextTheme } from '@/shared/ui/deprecated/Text';

import { useGetArticlesRecommendationsListQuery } from '../../api/ArticleRecommendationsListApi';

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo(
  ({ className }: ArticleRecommendationsListProps) => {
    const { t } = useTranslation();

    const {
      data: articles,
      isLoading,
      error,
    } = useGetArticlesRecommendationsListQuery(3);

    const mods: Mods = {};

    if (isLoading || !articles) {
      return (
        <div className={classNames('', mods, [className])}>
          <Loader />
        </div>
      );
    }

    return (
      <div
        className={classNames('', mods, [className])}
        data-testid="ArticleRecommendationsList"
      >
        <Text size={TextSize.L} title={t('Recommendations') ?? ''} />

        {!error && (
          <div style={{ height: '350px' }}>
            <ArticleList
              articles={articles}
              isLoading={isLoading}
              target="_blank"
              view="TABLE"
              virtualized={false}
            />
          </div>
        )}
        {error && (
          <Text
            theme={TextTheme.ERROR}
            title={t('Recommendations loading error!') ?? ''}
          />
        )}
      </div>
    );
  },
);
