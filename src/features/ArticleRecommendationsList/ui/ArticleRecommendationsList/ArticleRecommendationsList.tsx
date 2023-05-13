import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { ArticleList } from '@/entities/Article';
import { Text, TextSize, TextTheme } from '@/shared/ui/Text/Text';
import { PageLoader } from '@/widgets/PageLoader';
import {
  useGetArticlesRecommendationsListQuery,
} from '../../api/ArticleRecommendationsListApi';

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo(({ className }: ArticleRecommendationsListProps) => {
  const { t } = useTranslation();

  const { data: articles, isLoading, error } = useGetArticlesRecommendationsListQuery(3);

  const mods: Mods = {};

  if (isLoading || !articles) {
    return (
      <div className={classNames('', mods, [className])}>
        <PageLoader />
      </div>
    );
  }

  return (
    <div className={classNames('', mods, [className])}>
      <Text
        size={TextSize.L}
        title={t('Recommendations') ?? ''}
      />

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
        <Text theme={TextTheme.ERROR} title={t('Recommendations loading error!') ?? ''} />
      )}
    </div>

  );
});
