import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Page } from 'widgets/Page';
import classes from './AdminPanelPage.module.scss';

interface AdminPanelPageProps {
  className?: string;
}

const AdminPanelPage = memo(({ className }: AdminPanelPageProps) => {
  const { t } = useTranslation();

  const mods: Mods = {};

  return (
    <Page className={classNames(classes.AdminPanelPage, mods, [className])}>
      {t('Admin panel page')}
    </Page>
  );
});

export default AdminPanelPage;
