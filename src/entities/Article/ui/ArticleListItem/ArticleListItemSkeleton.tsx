import { memo } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Card as CardRedesigned } from '@/shared/ui/redesigned/Card';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';

import classes from './ArticleListItem.module.scss';
import { ArticleView } from '../../model/types/article';

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

export const ArticleListItemSkeleton = memo(
  ({ className, view }: ArticleListItemSkeletonProps) => {
    const mods: Mods = {};

    const mainClass = toggleFeatures({
      name: 'isSiteRedesigned',
      on: () => classes.ArticleListItemRedesigned,
      off: () => classes.ArticleListItem,
    });

    const Skeleton = toggleFeatures({
      name: 'isSiteRedesigned',
      on: () => SkeletonRedesigned,
      off: () => SkeletonDeprecated,
    });

    if (view === 'LIST') {
      const cardContent = (
        <>
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
        </>
      );
      return (
        <div
          className={classNames(mainClass, mods, [className, classes[view]])}
        >
          <ToggleFeatures
            featureName="isSiteRedesigned"
            on={
              <CardRedesigned border="round" className={classes.card}>
                {cardContent}
              </CardRedesigned>
            }
            off={
              <CardDeprecated className={classes.card}>
                {cardContent}
              </CardDeprecated>
            }
          />
        </div>
      );
    }

    const cardContent = (
      <>
        <ToggleFeatures
          featureName="isSiteRedesigned"
          on={
            <Skeleton
              width="100%"
              height={150}
              border="32px"
              className={classes.img}
            />
          }
          off={
            <div className={classes.imageWrapper}>
              <Skeleton width={200} height={200} className={classes.img} />
            </div>
          }
        />
        <div className={classes.infoWrapper}>
          <Skeleton width={130} height={16} />
        </div>
        <Skeleton width={150} height={16} className={classes.title} />
      </>
    );

    return (
      <div className={classNames(mainClass, mods, [className, classes[view]])}>
        <ToggleFeatures
          featureName="isSiteRedesigned"
          on={
            <CardRedesigned border="round" className={classes.card}>
              {cardContent}
            </CardRedesigned>
          }
          off={
            <CardDeprecated className={classes.card}>
              {cardContent}
            </CardDeprecated>
          }
        />
      </div>
    );
  },
);
