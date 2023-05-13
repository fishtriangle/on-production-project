import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Dropdown } from '@/shared/ui/PopUps';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import {
  getUserAuthData, isUserAdmin, isUserManager, userActions,
} from '@/entities/User';

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = memo(({ className }: AvatarDropdownProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const mods: Mods = {};

  const authData = useSelector(getUserAuthData);
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  const onLogOut = useCallback(() => {
    dispatch(userActions.logOut());
  }, [dispatch]);

  const isAdminPanelAvailable = Boolean(isAdmin || isManager);

  if (authData) {
    return (
      <Dropdown
        className={classNames('', mods, [className])}
        direction="down right"
        items={[
          ...(isAdminPanelAvailable ? [{
            value: '1',
            content: t('Admin panel'),
            href: RoutePath.adminPanel,
          }] : []),
          {
            value: '2',
            content: t('Profile'),
            href: RoutePath.profile + authData.id,
          },
          {
            value: '3',
            content: t('Log out'),
            onClick: onLogOut,
          },
        ]}
        trigger={<Avatar size={30} src={authData.avatar} />}
      />
    );
  }
  return null;
});
