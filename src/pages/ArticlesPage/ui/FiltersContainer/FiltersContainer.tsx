import { memo } from 'react';

import { ArticlesFilter } from '@/widgets/ArticlesFilter';

import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface FiltersContainerProps {
  className?: string;
}

export const FiltersContainer = memo(({ className }: FiltersContainerProps) => {
  const {
    sort,
    order,
    search,
    type,
    onChangeSort,
    onChangeSearch,
    onChangeType,
    onChangeOrder,
  } = useArticleFilters();

  return (
    <ArticlesFilter
      className={className}
      search={search}
      type={type}
      sort={sort}
      order={order}
      onChangeSearch={onChangeSearch}
      onChangeType={onChangeType}
      onChangeSort={onChangeSort}
      onChangeOrder={onChangeOrder}
    />
  );
});
