import { memo } from 'react';

// import { useHover } from 'shared/lib/hooks/useHover/useHover';

import { ToggleFeatures } from '@/shared/lib/features';

import { ArticleListItemDeprecated } from './ArticleListItemDeprecated/ArticleListItemDeprecated';
import { ArticleListItemProps } from './ArticleListItemProps';
import { ArticleListItemRedesigned } from './ArticleListItemRedesigned/ArticleListItemRedesigned';

export const ArticleListItem = memo((props: ArticleListItemProps) => (
  <ToggleFeatures
    featureName="isSiteRedesigned"
    on={<ArticleListItemRedesigned {...props} />}
    off={<ArticleListItemDeprecated {...props} />}
  />
));
