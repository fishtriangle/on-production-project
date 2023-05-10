import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Icon } from 'shared/ui/Icon/Icon';
import { NotificationsList } from 'entities/Notification';
import { PopOver } from 'shared/ui/PopUps';
import NotificationIcon from 'shared/assets/icons/notifications.svg';
import classes from './NotificationsButton.module.scss';

interface NotificationsButtonProps {
  className?: string;
}

export const NotificationsButton = memo(({ className }: NotificationsButtonProps) => {
  const mods: Mods = {};

  return (
    <PopOver trigger={(
      <div className={classNames(classes.NotificationsButton, mods, [className])}>
        <Icon Svg={NotificationIcon} className={classes.icon} />
      </div>
    )}
    >
      <NotificationsList className={classes.notifications} />
    </PopOver>
  );
});
