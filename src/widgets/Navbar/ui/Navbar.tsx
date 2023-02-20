import React, { useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
// import { useTranslation } from 'react-i18next';
import { Modal } from 'shared/ui/Modal/Modal';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import classes from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const { t } = useTranslation();

  const [isAuthModal, setIsAuthModal] = useState(false);

  const onToggleModel = useCallback(() => {
    setIsAuthModal((prev) => !prev);
  }, []);

  return (
    <div className={classNames(classes.Navbar, {}, [className])}>
      <Button
        className={classes.links}
        theme={ButtonTheme.CLEAR_INVERTED}
        onClick={onToggleModel}
      >
        {t('Sign in')}
      </Button>
      <Modal isOpen={isAuthModal} onClose={onToggleModel}>
        {t('Lorem')}
      </Modal>
    </div>
  );
}
