import { memo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from '@/entities/User';
import { getRouteAdminPanel, getRouteProfile } from '@/shared/const/router';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/depricated/Avatar';
import { Dropdown } from '@/shared/ui/depricated/PopUps';

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
          ...(isAdminPanelAvailable
            ? [
                {
                  value: '1',
                  content: t('Admin panel'),
                  href: getRouteAdminPanel(),
                },
              ]
            : []),
          {
            value: '2',
            content: t('Profile'),
            href: getRouteProfile(authData.id),
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
