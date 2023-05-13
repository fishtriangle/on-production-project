import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import {
  Text, TextAlign, TextSize, TextTheme,
} from '@/shared/ui/Text/Text';
import classes from './ForbiddenPage.module.scss';

interface ForbiddenPageProps {
  className?: string;
}

const ForbiddenPage = memo(({ className }: ForbiddenPageProps) => {
  const { t } = useTranslation();

  const mods: Mods = {};

  return (
    <Page className={classNames(classes.ForbiddenPage, mods, [className])}>
      <Text title={t('Access denied')} theme={TextTheme.ERROR} align={TextAlign.CENTER} size={TextSize.L} />
    </Page>
  );
});

export default ForbiddenPage;
