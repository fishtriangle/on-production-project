import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions } from '../../model/slice/loginSlice';
import classes from './LoginForm.module.scss';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';

interface LoginFormProps {
  className?: string;
  isFocused?: boolean;
}

export const LoginForm = memo(({ className, isFocused }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    username, password, isLoading, error,
  } = useSelector(getLoginState);

  const onChangeUsername = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value));
  }, [dispatch]);

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value));
  }, [dispatch]);

  const onLoginClick = useCallback(() => {
    // @ts-ignore
    // TODO: add dispatch type
    dispatch(loginByUsername({ username, password }));
  }, [dispatch, password, username]);

  return (
    <div className={classNames(classes.LoginForm, {}, [className])}>
      <Text title={t('Auth form')} />
      {error && (
        <Text text={t(error)} theme={TextTheme.ERROR} />
      )}
      <Input
        type="text"
        className={classes.input}
        placeholder={t('Input username')}
        autofocus={isFocused}
        onChange={onChangeUsername}
        value={username}
      />
      <Input
        type="text"
        className={classes.input}
        placeholder={t('Input password')}
        onChange={onChangePassword}
        value={password}
      />
      <Button
        className={classes.loginBtn}
        theme={ButtonTheme.OUTLINE}
        onClick={onLoginClick}
        disabled={isLoading}
      >
        {t('Log in')}
      </Button>
    </div>
  );
});
