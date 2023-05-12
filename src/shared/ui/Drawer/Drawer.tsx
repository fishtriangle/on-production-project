import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { memo, ReactNode } from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { Portal } from 'shared/ui/Portal/Portal';
import { useModal } from 'shared/lib/hooks/useModal/useModal';
import classes from './Drawer.module.scss';
import { Overlay } from '../Overlay/Overlay';

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

export const Drawer = memo((props: DrawerProps) => {
  const {
    className, children, isOpen, onClose, lazy,
  } = props;

  const { theme } = useTheme();
  const { isClosing, isMounted, close } = useModal({
    animationDelay: 300,
    isOpen,
    onClose,
  });

  const mods: Mods = {
    [classes.opened]: isOpen,
    [classes.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div className={classNames(classes.Drawer, mods, [className, theme, 'app_drawer'])}>
        <Overlay onClick={close} />
        <div className={classes.content}>
          {children}
        </div>
      </div>
    </Portal>
  );
});
