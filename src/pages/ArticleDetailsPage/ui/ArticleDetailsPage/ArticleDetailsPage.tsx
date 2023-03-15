import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import classes from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
  className?: string;
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { t } = useTranslation('article');

  const mods: Mods = {};

  return (
    <div className={classNames(classes.ArticleDetailsPage, mods, [className])}>
      {t('Article details page')}
    </div>
  );
};

export default memo(ArticleDetailsPage);
