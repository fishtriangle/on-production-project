import { memo } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { VStack } from '@/shared/ui/redesigned/Stack';

import classes from './NotificationsList.module.scss';
import { useGetNotificationsListQuery } from '../../api/notificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';

interface NotificationsListProps {
  className?: string;
}

export const NotificationsList = memo(
  ({ className }: NotificationsListProps) => {
    const { data, isLoading } = useGetNotificationsListQuery(null, {
      pollingInterval: 5000,
    });

    const mods: Mods = {};

    const Skeleton = toggleFeatures({
      name: 'isSiteRedesigned',
      on: () => SkeletonRedesigned,
      off: () => SkeletonDeprecated,
    });

    if (isLoading) {
      return (
        <VStack
          gap="16"
          maxWidth
          className={classNames(classes.NotificationsList, mods, [className])}
        >
          <Skeleton width="100%" border="8px" height="80px" />
          <Skeleton width="100%" border="8px" height="80px" />
          <Skeleton width="100%" border="8px" height="80px" />
        </VStack>
      );
    }

    return (
      <VStack
        gap="16"
        maxWidth
        className={classNames(classes.NotificationsList, mods, [className])}
      >
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <NotificationItem key={item.id} notification={item} />
          ))}
      </VStack>
    );
  },
);
