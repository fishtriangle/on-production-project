import { memo } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import {
  AppLink as AppLinkDeprecated,
  AppLinkTheme,
} from '@/shared/ui/depricated/AppLink';
import { Card as CardDeprecated, CardTheme } from '@/shared/ui/depricated/Card';
import { Text as TextDeprecated } from '@/shared/ui/depricated/Text';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';

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
      <ToggleFeatures
        featureName="isSiteRedesigned"
        on={
          <Card
            className={classNames(classes.NotificationItem, mods, [className])}
          >
            <Text title={notification.title} text={notification.description} />
          </Card>
        }
        off={
          <CardDeprecated
            theme={CardTheme.OUTLINED}
            className={classNames(classes.NotificationItem, mods, [className])}
          >
            <TextDeprecated
              title={notification.title}
              text={notification.description}
            />
          </CardDeprecated>
        }
      />
    );

    if (notification.href) {
      return (
        <AppLinkDeprecated
          to={notification.href}
          theme={AppLinkTheme.SECONDARY}
          target="_blank"
          className={classes.link}
        >
          {content}
        </AppLinkDeprecated>
      );
    }

    return content;
  },
);
