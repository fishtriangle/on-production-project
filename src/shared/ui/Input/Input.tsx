import { classNames } from 'shared/lib/classNames/classNames';
import React, {
  InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import classes from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  autofocus?: boolean;
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    placeholder,
    autofocus,
    ...otherProps
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [pointerPosition, setPointerPosition] = useState(0);

  useEffect(() => {
    if (autofocus) {
      setIsFocused(true);
      inputRef?.current?.focus();
    }
  }, [autofocus]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    setPointerPosition(e.target.value.length);
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
    <div className={classNames(classes.InputWrapper, {}, [className])}>
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
          {...otherProps}
        />

        {
          isFocused && (
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
