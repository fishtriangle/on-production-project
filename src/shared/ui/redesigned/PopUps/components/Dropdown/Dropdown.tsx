import { Fragment, ReactNode } from 'react';

import { Menu } from '@headlessui/react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { AppLink } from '@/shared/ui/deprecated/AppLink';

import classes from './Dropdown.module.scss';
import { mapDirectionClasses } from '../../styles/consts';
import popupClasses from '../../styles/popups.module.scss';

export interface DropdownItem {
  content: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  value: string;
}

interface DropdownProps {
  className?: string;
  items: DropdownItem[];
  trigger: ReactNode;
  direction?: DropdownDirection;
}

export function Dropdown(props: DropdownProps) {
  const { className, trigger, items, direction = 'down left' } = props;

  const menuClasses = [mapDirectionClasses[direction], popupClasses.menu];

  return (
    <Menu
      as="div"
      className={classNames(classes.Dropdown, {}, [
        className,
        popupClasses.popup,
      ])}
    >
      <Menu.Button className={popupClasses.trigger}>{trigger}</Menu.Button>
      <Menu.Items className={classNames(classes.menu, {}, menuClasses)}>
        {items.map((item) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              disabled={item.disabled}
              type="button"
              onClick={item.onClick}
              className={classNames(
                classes.item,
                {
                  [popupClasses.active]: active,
                  [popupClasses.disabled]: item.disabled,
                },
                [],
              )}
            >
              {item.content}
            </button>
          );

          if (item.href) {
            return (
              <Menu.Item
                as={AppLink}
                to={item.href}
                key={item.value}
                refName="href"
                style={{ width: '100%' }}
              >
                {content}
              </Menu.Item>
            );
          }

          return (
            <Menu.Item as={Fragment} key={item.value} disabled={item.disabled}>
              {content}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
}
