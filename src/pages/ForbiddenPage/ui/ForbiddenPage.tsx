import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import {
  Text, TextAlign, TextSize, TextTheme,
} from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';

import classes from './ForbiddenPage.module.scss';

interface ForbiddenPageProps {
  className?: string;
}

const ForbiddenPage = memo(({ className }: ForbiddenPageProps) => {
  const { t } = useTranslation();

  const mods: Mods = {};

  return (
    <Page data-testid="ForbiddenPage" className={classNames(classes.ForbiddenPage, mods, [className])}>
      <Text title={t('Access denied')} theme={TextTheme.ERROR} align={TextAlign.CENTER} size={TextSize.L} />
    </Page>
  );
});

export default ForbiddenPage;
