import { memo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/PopUps';
import { ListBox } from '@/shared/ui/redesigned/PopUps';

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

export const CountrySelect = memo(
  ({ className, value, onChange, readonly }: CountrySelectProps) => {
    const { t } = useTranslation();

    const mods: Mods = {};

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Country);
      },
      [onChange],
    );

    const props = {
      onChange: onChangeHandler,
      value,
      className: classNames('', mods, [className]),
      label: t('Choose country'),
      defaultValue: t('Country is not selected'),
      items: options,
      unavailable: readonly,
      direction: 'up right' as const,
    };

    return (
      <ToggleFeatures
        featureName="isSiteRedesigned"
        on={<ListBox {...props} />}
        off={<ListBoxDeprecated {...props} />}
      />

      // <Select
      //   className={classNames(classes.CountrySelect, mods, [className])}
      //   label={t('Choose country')}
      //   options={options}
      //   value={value}
      //   onChange={onChangeHandler}
      //   readonly={readonly}
      // />
    );
  },
);
