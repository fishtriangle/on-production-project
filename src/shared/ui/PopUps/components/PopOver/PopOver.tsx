import { ReactNode } from 'react';

import { Popover } from '@headlessui/react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';

import classes from './PopOver.module.scss';
import { mapDirectionClasses } from '../../styles/consts';
import popupClasses from '../../styles/popups.module.scss';

interface PopOverProps {
  className?: string;
  trigger: ReactNode;
  direction?: DropdownDirection;
  children: ReactNode;
}

export function PopOver(props: PopOverProps) {
  const {
    className, trigger, children, direction = 'down right',
  } = props;

  const menuClasses = [
    mapDirectionClasses[direction],
  ];

  return (
    <Popover className={classNames(classes.PopOver, {}, [className, popupClasses.popup])}>
      <Popover.Button className={popupClasses.trigger}>{trigger}</Popover.Button>

      <Popover.Panel className={classNames(classes.panel, {}, menuClasses)}>
        {children}
      </Popover.Panel>
    </Popover>
  );
}
