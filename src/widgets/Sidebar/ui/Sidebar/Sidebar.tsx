import { classNames } from 'shared/lib/classNames/classNames';
import { useCallback, useState } from 'react';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LanguageSwitcher } from 'widgets/LanguageSwitcher';
import { Button } from 'shared/ui/Button';
import classes from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  return (
    <div
      className={classNames(
        classes.Sidebar,
        { [classes.collapsed]: collapsed },
        [className],
      )}
    >
      <Button type="button" onClick={handleToggle} className={classes.toggleBtn}>
        Toggle
      </Button>
      <div className={classes.switchers}>
        <ThemeSwitcher />
        <LanguageSwitcher className={classes.languageSwitcher} />
      </div>
    </div>
  );
}
