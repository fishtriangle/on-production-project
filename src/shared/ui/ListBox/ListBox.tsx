import { Fragment, ReactNode } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { HStack } from 'shared/ui/Stack';
import { DropdownDirection } from 'shared/types/ui';
import classes from './ListBox.module.scss';

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps {
  items?: ListBoxItem[];
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange: <T extends string>(value: T) => void;
  label?: string;
  unavailable?: boolean;
  direction?: DropdownDirection;
}

const mapDirectionClasses: Record<DropdownDirection, string> = {
  'up right': classes.optionUpRight,
  'down right': classes.optionDownRight,
  'up left': classes.optionUpLeft,
  'down left': classes.optionDownLeft,
};

export const ListBox = (props: ListBoxProps) => {
  const {
    items, value, defaultValue, className, onChange, label, unavailable, direction = 'down right',
  } = props;

  const optionsClasses = [
    mapDirectionClasses[direction],
  ];

  return (
    <HStack gap="8">
      {label && (
        <span className={classNames('', { [classes.disabled]: unavailable })}>
          {`${label}>`}
        </span>
      )}
      <HListBox
        as="div"
        className={classNames(classes.ListBox, { [classes.unavailable]: unavailable }, [className])}
        value={value}
        onChange={onChange}
        disabled={unavailable}
      >

        <HListBox.Button
          className={classes.trigger}
          unselectable={unavailable ? 'on' : 'off'}
        >
          {/* <Button disabled={unavailable}> */}
          {value ?? defaultValue}
          {/* </Button> */}
        </HListBox.Button>
        <HListBox.Options className={classNames(classes.options, {}, optionsClasses)}>
          {items?.map((item) => (
            <HListBox.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li className={classNames(
                  classes.item,
                  {
                    [classes.active]: active,
                    [classes.selected]: selected,
                    [classes.disabled]: item.disabled,
                  },
                  [],
                )}
                >
                  {selected ? (`✔ ${item.content}`) : item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  );
};
