import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUsername';
import {
  getUserAuthData, isUserAdmin, isUserManager, userActions,
} from 'entities/User';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import classes from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [isAuthModal, setIsAuthModal] = useState(false);

  const authData = useSelector(getUserAuthData);
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onLogOut = useCallback(() => {
    dispatch(userActions.logOut());
  }, [dispatch]);

  const isAdminPanelAvailable = Boolean(isAdmin || isManager);

  if (authData) {
    return (
      <header className={classNames(classes.Navbar, {}, [className])}>
        <Text
          className={classes.appName}
          title={t('Blog app')}
          theme={TextTheme.INVERTED}
        />
        <AppLink
          to={RoutePath.articleCreate}
          theme={AppLinkTheme.SECONDARY}
          className={classes.createButton}
        >
          {t('Create article')}
        </AppLink>
        <Dropdown
          direction="down right"
          className={classes.dropdown}
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
      </header>
    );
  }

  return (
    <header className={classNames(classes.Navbar, {}, [className])}>
      <Button
        className={classes.links}
        theme={ButtonTheme.CLEAR_INVERTED}
        onClick={onShowModal}
      >
        {t('Sign in')}
      </Button>
      {isAuthModal && (
        <LoginModal
          isOpen={isAuthModal}
          onClose={onCloseModal}
        />
      )}
    </header>
  );
});
