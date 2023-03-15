import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import classes from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const { t } = useTranslation('article');

  const mods: Mods = {};

  return (
    <div className={classNames(classes.ArticlesPage, mods, [className])}>
      {t('Articles page')}
    </div>
  );
};

export default memo(ArticlesPage);
