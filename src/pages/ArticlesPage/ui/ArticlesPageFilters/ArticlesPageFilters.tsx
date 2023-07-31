import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/deprecated/Card';
import { Input } from '@/shared/ui/deprecated/Input';

import classes from './ArticlesPageFilters.module.scss';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface ArticlesPageFiltersProps {
  className?: string;
}

export const ArticlesPageFilters = memo(
  ({ className }: ArticlesPageFiltersProps) => {
    const { t } = useTranslation();

    const mods: Mods = {};

    const {
      view,
      sort,
      order,
      search,
      type,
      onChangeSort,
      onChangeSearch,
      onChangeView,
      onChangeType,
      onChangeOrder,
    } = useArticleFilters();

    return (
      <div
        className={classNames(classes.ArticlesPageFilters, mods, [className])}
      >
        <div className={classes.sortWrapper}>
          <ArticleSortSelector
            sort={sort}
            order={order}
            onChangeOrder={onChangeOrder}
            onChangeSort={onChangeSort}
          />
          <ArticleViewSelector view={view} onViewClick={onChangeView} />
        </div>
        <Card className={classes.search}>
          <Input
            placeholder={t('Search') || ''}
            onChange={onChangeSearch}
            value={search}
          />
        </Card>
        <ArticleTypeTabs
          onChangeType={onChangeType}
          value={type}
          className={classes.tabs}
        />
      </div>
    );
  },
);
