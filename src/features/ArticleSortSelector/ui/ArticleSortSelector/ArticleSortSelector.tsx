import { memo, useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import { ArticleSortField } from '@/entities/Article';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { SortOrder } from '@/shared/types/sort';
import { Select, SelectOptions } from '@/shared/ui/deprecated/Select';
import { ListBox } from '@/shared/ui/redesigned/PopUps';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import classes from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const { className, sort, order, onChangeSort, onChangeOrder } = props;
  const { t } = useTranslation();

  const mods: Mods = {};

  const orderOptions = useMemo<SelectOptions<SortOrder>[]>(
    () => [
      { value: 'asc', content: t('Ascending') },
      { value: 'desc', content: t('Descending') },
    ],
    [t],
  );

  const sortFieldOptions = useMemo<SelectOptions<ArticleSortField>[]>(
    () => [
      { value: 'createdAt', content: t('CreatedAt') },
      { value: 'views', content: t('Views') },
      { value: 'title', content: t('Title') },
    ],
    [t],
  );

  return (
    <ToggleFeatures
      featureName="isSiteRedesigned"
      on={
        <VStack
          gap="8"
          className={classNames(classes.ArticleSortSelectorRedesigned, mods, [
            className,
          ])}
        >
          <Text text={t('Sort by')} />
          <ListBox
            items={sortFieldOptions}
            value={sort}
            onChange={onChangeSort}
            direction="down left"
          />
          <ListBox
            items={orderOptions}
            value={order}
            onChange={onChangeOrder}
            direction="down left"
          />
        </VStack>
      }
      off={
        <div
          className={classNames(classes.ArticleSortSelector, mods, [className])}
        >
          <Select<ArticleSortField>
            label={t('Sort by')}
            options={sortFieldOptions}
            value={sort}
            onChange={onChangeSort}
          />
          <Select<SortOrder>
            label={t('Order')}
            options={orderOptions}
            value={order}
            onChange={onChangeOrder}
            className={classes.order}
          />
        </div>
      }
    />
  );
});
