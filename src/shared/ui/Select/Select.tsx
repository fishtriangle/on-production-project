import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { ChangeEvent, memo, useMemo } from 'react';
import classes from './Select.module.scss';

export interface SelectOptions {
  value: string;
  content: string;
}

interface SelectProps {
  className?: string;
  label?: string;
  options?: SelectOptions[];
  value?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
}

export const Select = memo((props: SelectProps) => {
  const {
    className, label, options, value, onChange, readonly,
  } = props;

  const optionsList = useMemo(() => options?.map((option) => (
    <option
      className={classes.option}
      value={option.value}
      key={option.value}
    >
      {option.content}
    </option>
  )), [options]);

  const mods: Mods = {
    [classes.disabled]: readonly,
  };

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={classNames(classes.wrapper, mods, [className])}>
      {label && (
        <span className={classes.label}>
          {`${label}>`}
        </span>
      )}
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
