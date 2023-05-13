import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getUserAuthData } from '@/entities/User';
import { SidebarItemType } from '../../model/types/sidebar';
import classes from './SidebarItem.module.scss';

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
    <div className={classNames(classes.listItem, { [classes.collapsed]: collapsed })}>
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
