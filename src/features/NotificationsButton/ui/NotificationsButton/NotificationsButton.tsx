import { memo, useCallback, useState } from 'react';

import { NotificationsList } from '@/entities/Notification';
import NotificationIcon from '@/shared/assets/icons/notifications.svg';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useDevice } from '@/shared/lib/hooks/useDevice/useDevice';
import { Drawer } from '@/shared/ui/Drawer';
import { Icon } from '@/shared/ui/Icon';
import { PopOver } from '@/shared/ui/PopUps';

import classes from './NotificationsButton.module.scss';

interface NotificationsButtonProps {
  className?: string;
}

export const NotificationsButton = memo(
  ({ className }: NotificationsButtonProps) => {
    const mods: Mods = {};

    const [isDrawerOpened, setIsDrawerOpened] = useState(false);

    const isMobile = useDevice();

    const onOpenDrawer = useCallback(() => {
      setIsDrawerOpened(true);
    }, []);

    const onCloseDrawer = useCallback(() => {
      setIsDrawerOpened(false);
    }, []);

    const trigger = (
      <div
        className={classNames(classes.NotificationsButton, mods, [className])}
        onClick={onOpenDrawer}
      >
        <Icon Svg={NotificationIcon} className={classes.icon} />
      </div>
    );

    return (
      <div>
        {isMobile ? (
          <>
            {trigger}
            <Drawer isOpen={isDrawerOpened} onClose={onCloseDrawer}>
              <NotificationsList />
            </Drawer>
          </>
        ) : (
          <PopOver trigger={trigger}>
            <NotificationsList className={classes.notifications} />
          </PopOver>
        )}
      </div>
    );
  },
);
