import { memo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import {
  AppLink as AppLinkDepricated,
  AppLinkTheme,
} from '@/shared/ui/depricated/AppLink';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Icon } from '@/shared/ui/redesigned/Icon';

import classes from './SidebarItem.module.scss';
import { SidebarItemType } from '../../model/types/sidebar';

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation();

  const isAuth = useSelector(getUserAuthData);

  const DeprecatedSidebarItem = useCallback(
    () => (
      <div
        className={classNames(classes.listItem, {
          [classes.collapsed]: collapsed,
        })}
      >
        <AppLinkDepricated
          theme={AppLinkTheme.SECONDARY}
          to={item.path}
          className={classes.link}
        >
          <item.Icon className={classes.listIcon} />
          <span className={classes.listTitle}>{t(item.text)}</span>
        </AppLinkDepricated>
      </div>
    ),
    [collapsed, item, t],
  );

  if (item.authOnly && !isAuth) {
    return null;
  }

  return (
    <ToggleFeatures
      featureName="isSiteRedesigned"
      on={
        <div
          className={classNames(classes.listItemRedesigned, {
            [classes.collapsedRedesigned]: collapsed,
          })}
        >
          <AppLink
            to={item.path}
            className={classes.itemRedesigned}
            activeClassName={classes.active}
          >
            <Icon Svg={item.Icon} />
            <span className={classes.listTitle}>{t(item.text)}</span>
          </AppLink>
        </div>
      }
      off={<DeprecatedSidebarItem />}
    />
  );
});
