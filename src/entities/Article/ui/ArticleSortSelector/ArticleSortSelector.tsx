import { memo, useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types';
import { Select, SelectOptions } from '@/shared/ui/Select';

import classes from './ArticleSortSelector.module.scss';
import { ArticleSortField } from '../../model/types/article';

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const {
    className,
    sort,
    order,
    onChangeSort,
    onChangeOrder,
  } = props;
  const { t } = useTranslation();

  const mods: Mods = {};

  const orderOptions = useMemo<SelectOptions<SortOrder>[]>(() => [
    { value: 'asc', content: t('Ascending') },
    { value: 'desc', content: t('Descending') },
  ], [t]);

  const sortFieldOptions = useMemo<SelectOptions<ArticleSortField>[]>(() => [
    { value: '', content: t('Without sort') },
    { value: 'createdAt', content: t('CreatedAt') },
    { value: 'views', content: t('Views') },
    { value: 'title', content: t('Title') },
  ], [t]);

  return (
    <div className={classNames(classes.ArticleSortSelector, mods, [className])}>
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
  );
});
