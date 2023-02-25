import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import classes from './LoginForm.module.scss';

interface LoginFormProps {
  className?: string;
  isFocused?: boolean;
}

export const LoginForm = ({ className, isFocused }: LoginFormProps) => {
  const { t } = useTranslation();
  return (
    <div className={classNames(classes.LoginForm, {}, [className])}>
      <Input type="text" className={classes.input} placeholder={t('Input username')} autofocus={isFocused} />
      <Input type="text" className={classes.input} placeholder={t('Input password')} />
      <Button className={classes.loginBtn}>
        {t('Log in')}
      </Button>
    </div>
  );
};
