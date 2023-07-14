import { Dispatch, memo, SetStateAction, useCallback, useMemo } from 'react';

import { useSelector } from 'react-redux';

import { LanguageSwitcher } from '@/features/LanguageSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import ArrowIcon from '@/shared/assets/icons/import/arrow-bottom.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/depricated/Button';
import { VStack } from '@/shared/ui/depricated/Stack';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon';

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
              { [classes.collapsedRedesigned]: collapsed },
              [className],
            )}
          >
            <AppLogo size={collapsed ? 32 : 50} className={classes.appLogo} />
            <VStack
              role="navigation"
              gap="8"
              className={classes.list}
              align={collapsed ? 'end' : 'start'}
            >
              {itemsList}
            </VStack>
            <Icon
              data-testid="sidebar-toggle"
              onClick={handleToggle}
              className={classes.collapseBtn}
              Svg={ArrowIcon}
              clickable
            />
            <div className={classes.switchers}>
              <ThemeSwitcher />
              <LanguageSwitcher
                className={classes.languageSwitcher}
                short={collapsed}
              />
            </div>
          </aside>
        }
        off={<DeprecatedSidebar />}
      />
    );
  },
);
