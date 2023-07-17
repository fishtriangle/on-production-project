import { memo, useCallback, useState } from 'react';

import { NotificationsList } from '@/entities/Notification';
import NotificationIcon from '@/shared/assets/icons/import/notification.svg';
import NotificationIconDeprecated from '@/shared/assets/icons/notifications.svg';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useDevice } from '@/shared/lib/hooks/useDevice/useDevice';
import { Drawer } from '@/shared/ui/depricated/Drawer';
import { Icon as IconDeprecated } from '@/shared/ui/depricated/Icon';
import { PopOver as PopOverDeprecated } from '@/shared/ui/depricated/PopUps';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { PopOver } from '@/shared/ui/redesigned/PopUps';

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
      <ToggleFeatures
        featureName="isSiteRedesigned"
        on={<Icon Svg={NotificationIcon} clickable onClick={onOpenDrawer} />}
        off={
          <div
            className={classNames(classes.NotificationsButton, mods, [
              className,
            ])}
            onClick={onOpenDrawer}
          >
            <IconDeprecated
              Svg={NotificationIconDeprecated}
              className={classes.icon}
            />
          </div>
        }
      />
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
          <ToggleFeatures
            featureName="isSiteRedesigned"
            on={
              <PopOver trigger={trigger}>
                <NotificationsList className={classes.notifications} />
              </PopOver>
            }
            off={
              <PopOverDeprecated trigger={trigger}>
                <NotificationsList className={classes.notifications} />
              </PopOverDeprecated>
            }
          />
        )}
      </div>
    );
  },
);
