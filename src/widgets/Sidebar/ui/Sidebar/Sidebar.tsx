import {
  Dispatch, memo, SetStateAction, useCallback, useMemo,
} from 'react';
import { useSelector } from 'react-redux';

import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LanguageSwitcher } from 'widgets/LanguageSwitcher';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';

import { SidebarItem } from '../SidebarItem/SidebarItem';
import classes from './Sidebar.module.scss';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';

interface SidebarProps {
  className?: string;
  collapsed: boolean;
  setCollapsed?: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar = memo(({ className, setCollapsed, collapsed }: SidebarProps) => {
  const sidebarItemsList = useSelector(getSidebarItems);

  const handleToggle = useCallback(() => {
    if (setCollapsed) {
      setCollapsed((prev) => !prev);
    }
  }, [setCollapsed]);

  const itemsList = useMemo(() => sidebarItemsList
    .map((item) => (
      <SidebarItem
        key={item.path}
        item={item}
        collapsed={collapsed}
      />
    )), [collapsed, sidebarItemsList]);

  return (
    <menu
      data-testid="sidebar"
      className={classNames(
        classes.Sidebar,
        { [classes.collapsed]: collapsed },
        [className],
      )}
    >
      <div className={classes.list}>
        {itemsList}
      </div>

      <Button
        data-testid="sidebar-toggle"
        type="button"
        onClick={handleToggle}
        className={classes.toggleBtn}
        theme={ButtonTheme.BACKGROUND_INVERTED}
        size={ButtonSize.L}
        square
      >
        {collapsed ? '>' : '<'}
      </Button>
      <div className={classes.switchers}>
        <ThemeSwitcher />
        <LanguageSwitcher className={classes.languageSwitcher} short={collapsed} />
      </div>
    </menu>
  );
});
