import { ChangeEvent, useMemo } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { typedMemo } from '@/shared/lib/typedMemo/typedMemo';

import classes from './Select.module.scss';

export interface SelectOptions<T extends string> {
  value: T;
  content: string;
}

interface SelectProps<T extends string> {
  className?: string;
  label?: string | null;
  options?: SelectOptions<T>[];
  value?: T;
  onChange?: (value: T) => void;
  readonly?: boolean;
}

export const Select = typedMemo(<T extends string>(props: SelectProps<T>) => {
  const { className, label, options, value, onChange, readonly } = props;

  const optionsList = useMemo(
    () =>
      options?.map((option) => (
        <option
          className={classes.option}
          value={option.value}
          key={option.value}
        >
          {option.content}
        </option>
      )),
    [options],
  );

  const mods: Mods = {
    [classes.disabled]: readonly,
  };

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as T);
  };

  return (
    <div className={classNames(classes.wrapper, mods, [className])}>
      {label && <span className={classes.label}>{`${label}>`}</span>}
      <select
        disabled={readonly}
        className={classes.select}
        value={value}
        onChange={onChangeHandler}
      >
        {optionsList}
      </select>
    </div>
  );
});
