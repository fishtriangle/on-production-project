import { memo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';

import classes from './LanguageSwitcher.module.scss';

interface LanguageSwitcherProps {
  className?: string;
  short?: boolean;
}

export const LanguageSwitcher = memo(
  ({ className, short }: LanguageSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toddleLanguage = useCallback(() => {
      i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    }, [i18n]);

    const SwitcherDeprecated = useCallback(
      () => (
        <ButtonDeprecated
          theme={ButtonTheme.CLEAR}
          onClick={toddleLanguage}
          className={classNames(classes.LanguageSwitcher, {}, [className])}
        >
          {t(short ? 'LanguageShort' : 'Language')}
        </ButtonDeprecated>
      ),
      [className, short, t, toddleLanguage],
    );

    return (
      <ToggleFeatures
        featureName="isSiteRedesigned"
        on={
          <Button variant="clear" onClick={toddleLanguage}>
            {t(short ? 'LanguageShort' : 'Language')}
          </Button>
        }
        off={<SwitcherDeprecated />}
      />
    );
  },
);
