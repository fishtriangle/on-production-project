import { Dispatch, memo, SetStateAction, useCallback, useMemo } from 'react';

import { useSelector } from 'react-redux';

import { LanguageSwitcher } from '@/features/LanguageSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLogo } from '@/shared/ui/depricated/AppLogo';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/depricated/Button';
import { VStack } from '@/shared/ui/depricated/Stack';

import classes from './Sidebar.module.scss';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';

interface SidebarProps {
  className?: string;
  collapsed: boolean;
  setCollapsed?: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar = memo(
  ({ className, setCollapsed, collapsed }: SidebarProps) => {
    const sidebarItemsList = useSelector(getSidebarItems);

    const handleToggle = useCallback(() => {
      if (setCollapsed) {
        setCollapsed((prev) => !prev);
      }
    }, [setCollapsed]);

    const itemsList = useMemo(
      () =>
        sidebarItemsList.map((item) => (
          <SidebarItem key={item.path} item={item} collapsed={collapsed} />
        )),
      [collapsed, sidebarItemsList],
    );

    const DeprecatedSidebar = () =>
      useMemo(
        () => (
          <aside
            data-testid="sidebar"
            className={classNames(
              classes.Sidebar,
              { [classes.collapsed]: collapsed },
              [className],
            )}
          >
            <VStack
              role="navigation"
              gap="8"
              className={classes.list}
              align={collapsed ? 'end' : 'start'}
            >
              {itemsList}
            </VStack>

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
              <LanguageSwitcher
                className={classes.languageSwitcher}
                short={collapsed}
              />
            </div>
          </aside>
        ),
        [],
      );

    return (
      <ToggleFeatures
        featureName="isSiteRedesigned"
        on={
          <aside
            data-testid="sidebar"
            className={classNames(
              classes.SidebarRedesigned,
              { [classes.collapsed]: collapsed },
              [className],
            )}
          >
            <AppLogo className={classes.appLogo} />
          </aside>
        }
        off={<DeprecatedSidebar />}
      />
    );
  },
);
