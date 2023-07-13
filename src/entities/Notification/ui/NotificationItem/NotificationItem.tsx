import { memo } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/depricated/AppLink';
import { Card, CardTheme } from '@/shared/ui/depricated/Card';
import { Text } from '@/shared/ui/depricated/Text';

import classes from './NotificationItem.module.scss';
import { Notification } from '../../model/types/notification';

interface NotificationItemProps {
  className?: string;
  notification: Notification;
}

export const NotificationItem = memo(
  ({ className, notification }: NotificationItemProps) => {
    const mods: Mods = {};

    const content = (
      <Card
        theme={CardTheme.OUTLINED}
        className={classNames(classes.NotificationItem, mods, [className])}
      >
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
  },
);
