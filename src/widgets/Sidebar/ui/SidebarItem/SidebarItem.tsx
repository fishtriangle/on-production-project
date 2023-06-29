import { memo } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink';

import classes from './SidebarItem.module.scss';
import { SidebarItemType } from '../../model/types/sidebar';

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation();

  const isAuth = useSelector(getUserAuthData);

  if (item.authOnly && !isAuth) {
    return null;
  }

  return (
    <div
      className={classNames(classes.listItem, {
        [classes.collapsed]: collapsed,
      })}
    >
      <AppLink
        theme={AppLinkTheme.SECONDARY}
        to={item.path}
        className={classes.link}
      >
        <item.Icon className={classes.listIcon} />
        <span className={classes.listTitle}>{t(item.text)}</span>
      </AppLink>
    </div>
  );
});
