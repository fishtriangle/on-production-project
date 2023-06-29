import { memo } from 'react';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

import classes from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = memo(({ className }: ArticleEditPageProps) => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const isEditPage = Boolean(id);

  const mods: Mods = {};

  return (
    <Page className={classNames(classes.ArticleEditPage, mods, [className])}>
      {isEditPage ? t('Edit article #') + id : t('Create new article')}
    </Page>
  );
});

export default ArticleEditPage;
