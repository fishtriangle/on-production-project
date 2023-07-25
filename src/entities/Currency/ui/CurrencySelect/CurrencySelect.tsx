import { memo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/depricated/PopUps';
import { ListBox } from '@/shared/ui/redesigned/PopUps';

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

export const CurrencySelect = memo(
  ({ className, value, onChange, readonly }: CurrencySelectProps) => {
    const { t } = useTranslation();

    const mods: Mods = {};

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Currency);
      },
      [onChange],
    );

    const props = {
      onChange: onChangeHandler,
      value,
      className: classNames('', mods, [className]),
      label: t('Choose currency'),
      defaultValue: t('Currency is not selected'),
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
      //   className={classNames(classes.CurrencySelect, mods, [className])}
      //   label={t('Choose currency')}
      //   options={options}
      //   value={value}
      //   onChange={onChangeHandler}
      //   readonly={readonly}
      // />
    );
  },
);
