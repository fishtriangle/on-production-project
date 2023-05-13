import { memo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Card, CardTheme } from '@/shared/ui/Card/Card';
import { Text } from '@/shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { Notification } from '../../model/types/notification';
import classes from './NotificationItem.module.scss';

interface NotificationItemProps {
  className?: string;
  notification: Notification;
}

export const NotificationItem = memo(({ className, notification }: NotificationItemProps) => {
  const mods: Mods = {};

  const content = (
    <Card theme={CardTheme.OUTLINED} className={classNames(classes.NotificationItem, mods, [className])}>
      <Text title={notification.title} text={notification.description} />
    </Card>
  );

  if (notification.href) {
    return (
      <AppLink
        to={notification.href}
        theme={AppLinkTheme.SECONDARY}
        target="_blank"
        className={classes.link}
      >
        {content}
      </AppLink>
    );
  }

  return content;
});
