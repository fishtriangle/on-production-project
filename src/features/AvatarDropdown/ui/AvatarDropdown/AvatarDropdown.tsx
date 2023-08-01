import { memo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  User,
  userActions,
} from '@/entities/User';
import {
  getRouteAdminPanel,
  getRouteProfile,
  getRouteSettings,
} from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import {
  Dropdown as DropdownDeprecated,
  DropdownItem,
} from '@/shared/ui/deprecated/PopUps';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Dropdown } from '@/shared/ui/redesigned/PopUps';

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = memo(({ className }: AvatarDropdownProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const authData = useSelector(getUserAuthData);
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  const onLogOut = useCallback(() => {
    dispatch(userActions.logOut());
  }, [dispatch]);

  const isAdminPanelAvailable = Boolean(isAdmin || isManager);

  interface DropdownDeprecatedProps {
    items: DropdownItem[];
    authData: User;
  }

  const DropdownItemDeprecated = useCallback(
    ({ items, authData }: DropdownDeprecatedProps) => (
      <DropdownDeprecated
        className={classNames('', {}, [className])}
        direction="down right"
        items={items}
        trigger={<AvatarDeprecated size={30} src={authData.avatar} />}
      />
    ),
    [className],
  );

  if (authData) {
    const items = [
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
        value: '4',
        content: t('Settings'),
        href: getRouteSettings(),
      },
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
    ];

    return (
      <ToggleFeatures
        featureName="isSiteRedesigned"
        on={
          <Dropdown
            className={classNames('', {}, [className])}
            direction="down right"
            items={items}
            trigger={<Avatar size={40} src={authData.avatar} />}
          />
        }
        off={<DropdownItemDeprecated authData={authData} items={items} />}
      />
    );
  }
  return null;
});
