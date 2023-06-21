import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

import classes from './Page404.module.scss';

interface Page404Props {
  className?: string;
}

export const Page404 = memo(({ className }: Page404Props) => {
  const { t } = useTranslation();

  return (
    <Page data-testid="Page404" className={classNames(classes.Page404, {}, [className])}>
      {t('Page not found')}
    </Page>
  );
});
