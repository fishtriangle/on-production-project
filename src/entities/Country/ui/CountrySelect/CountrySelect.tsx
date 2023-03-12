import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select/Select';
import { memo, useCallback } from 'react';
import classes from './CountrySelect.module.scss';
import { Country } from '../../model/types/country';

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

const options = [
  {
    value: Country.RU,
    content: Country.RU,
  },
  {
    value: Country.BEL,
    content: Country.BEL,
  },
  {
    value: Country.KAZ,
    content: Country.KAZ,
  },
];

export const CountrySelect = memo(({
  className, value, onChange, readonly,
}: CountrySelectProps) => {
  const { t } = useTranslation();

  const mods: Mods = {

  };

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Country);
  }, [onChange]);

  return (
    <Select
      className={classNames(classes.CountrySelect, mods, [className])}
      label={t('Choose country')}
      options={options}
      value={value}
      onChange={onChangeHandler}
      readonly={readonly}
    />
  );
});
