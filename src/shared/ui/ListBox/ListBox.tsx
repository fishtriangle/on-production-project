import {
  Fragment, memo, ReactNode,
} from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { HStack } from 'shared/ui/Stack';
import classes from './ListBox.module.scss';

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

type DropdownDirection = 'up' | 'down';

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
  up: classes.optionUp,
  down: classes.optionDown,
};

export const ListBox = memo((props: ListBoxProps) => {
  const {
    items, value, defaultValue, className, onChange, label, unavailable, direction = 'down',
  } = props;

  const optionsClasses = [
    mapDirectionClasses[direction],
  ];

  return (
    <HStack gap="8">
      {label && (
        <span>
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
        >
          <Button disabled={unavailable}>
            {value ?? defaultValue}
          </Button>
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
});
