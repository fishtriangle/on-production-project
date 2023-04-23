import { Menu } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Fragment, ReactNode } from 'react';
import { DropdownDirection } from 'shared/types/ui';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import classes from './Dropdown.module.scss';

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

const mapDirectionClasses: Record<DropdownDirection, string> = {
  'up right': classes.optionUpRight,
  'down right': classes.optionDownRight,
  'up left': classes.optionUpLeft,
  'down left': classes.optionDownLeft,
};

export function Dropdown(props: DropdownProps) {
  const {
    className, trigger, items, direction = 'down left',
  } = props;

  const menuClasses = [
    mapDirectionClasses[direction],
  ];

  return (
    <Menu as="div" className={classNames(classes.Dropdown, {}, [className])}>
      <Menu.Button className={classes.button}>
        {trigger}
      </Menu.Button>
      <Menu.Items className={classNames(classes.menu, {}, menuClasses)}>
        {items.map((item) => {
          const content = ({ active } : {active: boolean}) => (
            <button
              disabled={item.disabled}
              type="button"
              onClick={item.onClick}
              className={classNames(
                classes.item,
                {
                  [classes.active]: active,
                  [classes.disabled]: item.disabled,
                },
                [],
              )}
            >
              {item.content}
            </button>
          );

          if (item.href) {
            return (
              <Menu.Item as={AppLink} to={item.href} key={item.value} refName="href">
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
