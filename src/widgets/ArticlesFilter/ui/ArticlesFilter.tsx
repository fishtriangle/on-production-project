import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { ArticleSortField, ArticleType } from '@/entities/Article';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import SearchIcon from '@/shared/assets/icons/import/search.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types/sort';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';

import classes from './ArticlesFilter.module.scss';

interface ArticlesFilterProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  type: ArticleType;
  search: string;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
  onChangeType: (type: ArticleType) => void;
  onChangeSearch: (search: string) => void;
}

export const ArticlesFilter = memo((props: ArticlesFilterProps) => {
  const { t } = useTranslation();
  const {
    className,
    sort,
    order,
    onChangeSort,
    onChangeOrder,
    onChangeType,
    type,
    onChangeSearch,
    search,
  } = props;

  return (
    <Card
      className={classNames(classes.ArticlesFilter, {}, [className])}
      paddings="24"
    >
      <VStack gap="32">
        <Input
          placeholder={t('Search') || ''}
          onChange={onChangeSearch}
          value={search}
          size="s"
          addonLeft={<Icon Svg={SearchIcon} className={classes.icon} />}
        />
        <ArticleTypeTabs
          onChangeType={onChangeType}
          value={type}
          className={classes.tabs}
        />
        <ArticleSortSelector
          sort={sort}
          order={order}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
      </VStack>
    </Card>
  );
});
