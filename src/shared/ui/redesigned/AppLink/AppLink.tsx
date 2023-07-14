import { memo, ReactNode } from 'react';

import { LinkProps, NavLink } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'secondary' | 'red';

interface AppLinkProps extends LinkProps {
  className?: string;
  variant?: AppLinkVariant;
  children?: ReactNode;
  activeClassName?: string;
}

export const AppLink = memo((props: AppLinkProps) => {
  const {
    children,
    className,
    activeClassName = '',
    variant = 'primary',
    to,
    ...otherProps
  } = props;
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        classNames('', { [activeClassName]: isActive }, [
          className,
          classes[variant],
        ])
      }
      {...otherProps}
    >
      {children}
    </NavLink>
  );
});
