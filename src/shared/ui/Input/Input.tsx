import React, {
  InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readonly'>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  autofocus?: boolean;
  readonly?: boolean;
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    placeholder,
    autofocus,
    readonly = false,
    ...otherProps
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [pointerPosition, setPointerPosition] = useState(0);

  const isCaretVisible = isFocused && !readonly;

  const mods: Record<string, boolean> = {
    [classes.readonly]: readonly,
  };

  useEffect(() => {
    if (autofocus) {
      setIsFocused(true);
      inputRef?.current?.focus();
    }
  }, [autofocus]);

  useEffect(() => {
    setPointerPosition(String(value)?.length || 0);
  }, [value]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onSelect = (e: React.SyntheticEvent<HTMLInputElement, Event>) => {
    setPointerPosition(e.currentTarget.selectionStart || 0);
  };

  return (
    <div className={classNames(classes.InputWrapper, mods, [className])}>
      {
        placeholder && (
          <div className={classes.placeholder}>
            {`${placeholder}>`}
          </div>
        )
      }

      <div className={classes.pointerWrapper}>
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={onChangeHandler}
          className={classes.input}
          onFocus={onFocus}
          onBlur={onBlur}
          onSelect={onSelect}
          readOnly={readonly}
          {...otherProps}
        />

        {
          isCaretVisible && (
            <span
              className={classes.pointer}
              style={{ left: `${pointerPosition * 8.8}px` }}
            />
          )
        }

      </div>
    </div>
  );
});
