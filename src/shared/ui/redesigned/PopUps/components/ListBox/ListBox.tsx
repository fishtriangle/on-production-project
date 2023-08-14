import { Fragment, ReactNode, useMemo } from 'react';

import { Listbox as HListBox } from '@headlessui/react';

import ArrowIcon from '@/shared/assets/icons/import/arrow-bottom.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { HStack } from '@/shared/ui/redesigned/Stack';

import classes from './ListBox.module.scss';
import { mapDirectionClasses } from '../../styles/consts';
import popupClasses from '../../styles/popups.module.scss';

export interface ListBoxItem<T extends string> {
  value: T;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps<T extends string> {
  items?: ListBoxItem<T>[];
  className?: string;
  value?: T;
  defaultValue?: string | null;
  onChange: (value: T) => void;
  label?: string | null;
  unavailable?: boolean;
  direction?: DropdownDirection;
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
  const {
    items,
    value,
    defaultValue,
    className,
    onChange,
    label,
    unavailable,
    direction = 'down right',
  } = props;

  const optionsClasses = [mapDirectionClasses[direction], popupClasses.menu];

  const selectedItem = useMemo(
    () => items?.find((item) => item.value === value),
    [items, value],
  );

  return (
    <HStack gap="8">
      {label && (
        <span className={classNames('', { [classes.disabled]: unavailable })}>
          {`${label}>`}
        </span>
      )}
      <HListBox
        as="div"
        className={classNames(
          classes.ListBox,
          { [classes.unavailable]: unavailable },
          [className, popupClasses.popup],
        )}
        value={value}
        onChange={onChange}
        disabled={unavailable}
      >
        <HListBox.Button
          className={popupClasses.trigger}
          unselectable={unavailable ? 'on' : 'off'}
          as={Button}
          variant="filled"
          addonRight={<Icon Svg={ArrowIcon} className={classes.icon} />}
        >
          {selectedItem?.content ?? defaultValue}
        </HListBox.Button>
        <HListBox.Options
          className={classNames(classes.options, {}, optionsClasses)}
        >
          {items?.map((item) => (
            <HListBox.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(
                    classes.item,
                    {
                      [popupClasses.active]: active,
                      [popupClasses.selected]: selected,
                      [popupClasses.disabled]: item.disabled,
                    },
                    [],
                  )}
                >
                  {selected ? `✔ ${item.content}` : item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  );
}
