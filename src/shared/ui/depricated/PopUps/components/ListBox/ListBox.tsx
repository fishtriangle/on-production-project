import { Fragment, ReactNode } from 'react';

import { Listbox as HListBox } from '@headlessui/react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { HStack } from '@/shared/ui/depricated/Stack';

import classes from './ListBox.module.scss';
import { mapDirectionClasses } from '../../styles/consts';
import popupClasses from '../../styles/popups.module.scss';

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps {
  items?: ListBoxItem[];
  className?: string;
  value?: string;
  defaultValue?: string | null;
  onChange: <T extends string>(value: T) => void;
  label?: string | null;
  unavailable?: boolean;
  direction?: DropdownDirection;
}

/**
 * Redesigned, use proper component.
 * @deprecated
 */
export const ListBox = (props: ListBoxProps) => {
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

  const optionsClasses = [mapDirectionClasses[direction]];

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
        >
          {/* <Button disabled={unavailable}> */}
          {value ?? defaultValue}
          {/* </Button> */}
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
};
