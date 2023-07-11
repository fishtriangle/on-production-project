import { memo, useCallback, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import { NotificationsButton } from '@/features/NotificationsButton';
import { getRouteArticleCreate } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { Text, TextTheme } from '@/shared/ui/Text';

import classes from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();

  const [isAuthModal, setIsAuthModal] = useState(false);

  const authData = useSelector(getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const NavbarDeprecated = () =>
    useMemo(
      () => (
        <header className={classNames(classes.Navbar, {}, [className])}>
          <Text
            className={classes.appName}
            title={t('Blog app')}
            theme={TextTheme.INVERTED}
          />
          <AppLink
            to={getRouteArticleCreate()}
            theme={AppLinkTheme.SECONDARY}
            className={classes.createButton}
          >
            {t('Create article')}
          </AppLink>
          <HStack gap="16" className={classes.actions}>
            <NotificationsButton />
            <AvatarDropdown />
          </HStack>
        </header>
      ),
      [],
    );

  const NavbarRedesigned = () =>
    useMemo(
      () => (
        <header
          className={classNames(classes.NavbarRedesigned, {}, [className])}
        >
          <HStack gap="16" className={classes.actions}>
            <NotificationsButton />
            <AvatarDropdown />
          </HStack>
        </header>
      ),
      [],
    );

  if (authData) {
    return (
      <ToggleFeatures
        featureName="isSiteRedesigned"
        on={<NavbarRedesigned />}
        off={<NavbarDeprecated />}
      />
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
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
    </header>
  );
});
