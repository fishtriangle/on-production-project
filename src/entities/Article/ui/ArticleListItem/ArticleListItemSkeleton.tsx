import { memo } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card/Card';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import classes from './ArticleListItem.module.scss';
import {
  ArticleView,
} from '../../model/types/article';

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

export const ArticleListItemSkeleton = memo(({ className, view }: ArticleListItemSkeletonProps) => {
  const mods: Mods = {};

  if (view === 'LIST') {
    return (
      <div
        className={classNames(classes.ArticleListItem, mods, [className, classes[view]])}
      >
        <Card>
          <div className={classes.header}>
            <Skeleton border="50%" height={30} width={30} />
            <Skeleton width={150} height={16} className={classes.username} />
            <Skeleton width={150} height={16} className={classes.date} />
          </div>
          <Skeleton width={250} height={24} className={classes.title} />
          <Skeleton height={200} className={classes.image} />
          <div className={classes.footer}>
            <Skeleton height={36} width={200} />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div
      className={classNames(classes.ArticleListItem, mods, [className, classes[view]])}
    >
      <Card>
        <div className={classes.imageWrapper}>
          <Skeleton width={200} height={200} className={classes.image} />
        </div>
        <div className={classes.infoWrapper}>
          <Skeleton width={130} height={16} />
        </div>
        <Skeleton width={150} height={16} className={classes.title} />
      </Card>
    </div>
  );
});
