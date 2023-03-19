import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import classes from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
  className?: string;
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { t } = useTranslation('article-details');

  const { id } = useParams<{id: string}>();

  const mods: Mods = {};

  if (!id) {
    return (
      <div className={classNames(classes.ArticleDetailsPage, mods, [className])}>
        {t('Article not found')}
      </div>
    );
  }

  return (
    <div className={classNames(classes.ArticleDetailsPage, mods, [className])}>
      <ArticleDetails id={id} />
    </div>
  );
};

export default memo(ArticleDetailsPage);
