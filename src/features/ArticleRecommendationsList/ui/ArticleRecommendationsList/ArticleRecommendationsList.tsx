import React, { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { ArticleList } from '@/entities/Article';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Loader } from '@/shared/ui/deprecated/Loader';
import {
  Text as TextDeprecated,
  TextSize,
  TextTheme,
} from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

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
      <VStack
        gap="8"
        className={classNames('', mods, [className])}
        data-testid="ArticleRecommendationsList"
      >
        <ToggleFeatures
          featureName="isSiteRedesigned"
          on={<Text size="size_l" title={t('Recommendations') ?? ''} />}
          off={
            <TextDeprecated
              size={TextSize.L}
              title={t('Recommendations') ?? ''}
            />
          }
        />

        {!error && (
          <ArticleList
            articles={articles}
            isLoading={isLoading}
            target="_blank"
            view="TABLE"
            virtualized={false}
          />
        )}
        {error && (
          <ToggleFeatures
            featureName="isSiteRedesigned"
            on={
              <Text
                variant="error"
                title={t('Recommendations loading error!') ?? ''}
              />
            }
            off={
              <TextDeprecated
                theme={TextTheme.ERROR}
                title={t('Recommendations loading error!') ?? ''}
              />
            }
          />
        )}
      </VStack>
    );
  },
);
