import {classNames} from "shared/lib/classNames/classNames";
import classes from './Sidebar.module.scss';
import {useCallback, useState} from "react";
import {ThemeSwitcher} from "widgets/ThemeSwitcher";
import {LanguageSwitcher} from "widgets/LanguageSwitcher";

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({className}: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, [])


  return (
    <div
      className={classNames(
        classes.Sidebar,
      {[classes.collapsed]: collapsed},
      [className]
      )}
    >
      <button onClick={handleToggle} className={classes.toggleBtn}>
        Toggle
      </button>
      <div className={classes.switchers}>
        <ThemeSwitcher />
        <LanguageSwitcher className={classes.languageSwitcher} />
      </div>
    </div>
  );
};
