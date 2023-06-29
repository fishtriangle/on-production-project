import { memo } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import classes from './Overlay.module.scss';

interface OverlayProps {
  className?: string;
  onClick?: () => void;
}

export const Overlay = memo(({ className, onClick }: OverlayProps) => {
  const mods: Mods = {};

  return (
    <div
      className={classNames(classes.Overlay, mods, [className])}
      onClick={onClick}
    />
  );
});
