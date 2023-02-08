import {classNames} from "shared/lib/classNames/classNames";
import classes from './LanguageSwitcher.module.scss';
import {useTranslation} from "react-i18next";
import React from "react";
import {Button} from "shared/ui/Button";
import {ThemeButton} from "shared/ui/Button/ui/Button";

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher = ({className}: LanguageSwitcherProps) => {
  const { t, i18n } = useTranslation();

  const toddleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  }

  return (
    <Button
      theme={ThemeButton.CLEAR}
      onClick={toddleLanguage}
      className={classNames(classes.LanguageSwitcher, {}, [className])}
    >
      {t('Language')}
    </Button>
  );
};
