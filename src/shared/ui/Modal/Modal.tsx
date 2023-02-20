import { classNames } from 'shared/lib/classNames/classNames';
import React, {
  ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import { Portal } from 'shared/ui/Portal/Portal';
import { useTheme } from 'app/providers/ThemeProvider';
import classes from './Modal.module.scss';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const ANIMATION_DELAY = 170;

export const Modal = (props: ModalProps) => {
  const {
    className,
    children,
    isOpen,
    onClose,
  } = props;

  const [isClosing, setIsClosing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const { theme } = useTheme();

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, ANIMATION_DELAY);
    }
  }, [onClose]);

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeHandler();
    }
  }, [closeHandler]);

  const onContentClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(
    () => {
      if (isOpen) {
        window.addEventListener('keydown', onKeyDown);
      }
      return () => {
        clearTimeout(timerRef.current);
        window.removeEventListener('keydown', onKeyDown);
      };
    },
    [isOpen, onKeyDown],
  );

  const mods: Record<string, boolean> = {
    [classes.opened]: isOpen,
    [classes.isClosing]: isClosing,
  };

  return (
    <Portal>
      <div className={classNames(classes.Modal, mods, [className, theme])}>
        <div className={classes.overlay} onClick={closeHandler}>
          <div className={classNames(classes.content, {}, [])} onClick={onContentClickHandler}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
