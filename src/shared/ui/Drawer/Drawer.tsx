import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { memo, ReactNode } from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { Portal } from 'shared/ui/Portal/Portal';
import classes from './Drawer.module.scss';
import { Overlay } from '../Overlay/Overlay';

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Drawer = memo((props: DrawerProps) => {
  const {
    className, children, isOpen, onClose,
  } = props;
  const { theme } = useTheme();

  const mods: Mods = {
    [classes.opened]: isOpen,
  };

  return (
    <Portal>
      <div className={classNames(classes.Drawer, mods, [className, theme, 'app_drawer'])}>
        <Overlay onClick={onClose} />
        <div className={classes.content}>
          {children}
        </div>
      </div>
    </Portal>

  );
});
