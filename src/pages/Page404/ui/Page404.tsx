import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import classes from './Page404.module.scss';

interface Page404Props {
  className?: string;
}

export const Page404 = ({ className }: Page404Props) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(classes.Page404, {}, [className])}>
      {t('Page not found')}
    </div>
  );
};
