import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { memo } from 'react';
import { SidebarItemType } from '../../model/items';
import classes from './SidebarItem.module.scss';

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation();
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
