import { Link, LinkProps } from 'react-router-dom';
import { memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './AppLink.module.scss';

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
  children?: ReactNode;
}

export const AppLink = memo((props: AppLinkProps) => {
  const {
    children,
    className,
    theme = AppLinkTheme.PRIMARY,
    to,
    ...otherProps
  } = props;
  return (
    <Link
      to={to}
      className={classNames(classes.AppLink, {}, [className, classes[theme]])}
      {...otherProps}
    >
      {children}
    </Link>
  );
});
