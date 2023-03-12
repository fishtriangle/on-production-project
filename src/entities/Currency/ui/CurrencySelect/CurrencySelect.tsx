import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select/Select';
import { memo, useCallback } from 'react';
import classes from './CurrencySelect.module.scss';
import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

const options = [
  {
    value: Currency.RUB,
    content: Currency.RUB,
  },
  {
    value: Currency.USD,
    content: Currency.USD,
  },
  {
    value: Currency.EUR,
    content: Currency.EUR,
  },
];

export const CurrencySelect = memo(({
  className, value, onChange, readonly,
}: CurrencySelectProps) => {
  const { t } = useTranslation();

  const mods: Mods = {

  };

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Currency);
  }, [onChange]);

  return (
    <Select
      className={classNames(classes.CurrencySelect, mods, [className])}
      label={t('Choose currency')}
      options={options}
      value={value}
      onChange={onChangeHandler}
      readonly={readonly}
    />
  );
});
