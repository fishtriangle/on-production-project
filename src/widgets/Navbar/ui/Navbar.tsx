import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import classes from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  return (
    <div className={classNames(classes.Navbar, {}, [className])}>
      <div className={classes.links}>
        <AppLink theme={AppLinkTheme.SECONDARY} to="/" className={classes.mainLink}>Main</AppLink>
        <AppLink theme={AppLinkTheme.SECONDARY} to="/about">About</AppLink>
      </div>
    </div>
  );
}
