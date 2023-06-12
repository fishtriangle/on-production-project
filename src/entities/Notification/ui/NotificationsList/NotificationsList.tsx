import { memo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { useGetNotificationsListQuery } from '../../api/notificationApi';
import classes from './NotificationsList.module.scss';

interface NotificationsListProps {
  className?: string;
}

export const NotificationsList = memo(({ className }: NotificationsListProps) => {
  const { data, isLoading } = useGetNotificationsListQuery(null, {
    pollingInterval: 5000,
  });

  const mods: Mods = {};

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
      {data && data.length > 0 && (
        data.map((item) => (
          <NotificationItem key={item.id} notification={item} />
        ))
      )}
    </VStack>
  );
});
