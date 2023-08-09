import { memo, useCallback, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import classes from './LoginForm.module.scss';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';

export interface LoginFormProps {
  className?: string;
  isFocused?: boolean;
  onSuccess: () => void;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
};

const LoginForm = memo(
  ({ className, isFocused, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

    const forceUpdate = useForceUpdate();

    const onChangeUsername = useCallback(
      (value: string) => {
        dispatch(loginActions.setUsername(value));
      },
      [dispatch],
    );

    const onChangePassword = useCallback(
      (value: string) => {
        dispatch(loginActions.setPassword(value));
      },
      [dispatch],
    );

    const onLoginClick = useCallback(async () => {
      const result = await dispatch(loginByUsername({ username, password }));
      if (result.meta.requestStatus === 'fulfilled') {
        onSuccess();
        forceUpdate();
      }
      return result;
    }, [dispatch, forceUpdate, onSuccess, password, username]);

    const onKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          onLoginClick();
        }
      },
      [onLoginClick],
    );

    useEffect(() => {
      window.addEventListener('keydown', onKeyDown);

      return () => {
        window.removeEventListener('keydown', onKeyDown);
      };
    }, [onKeyDown]);

    return (
      <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
        <ToggleFeatures
          featureName="isSiteRedesigned"
          on={
            <VStack
              className={classNames(classes.LoginFormRedesigned, {}, [
                className,
              ])}
              gap="16"
            >
              <Text title={t('Auth form')} />
              {error && <Text text={t(error)} variant="error" />}
              <Input
                type="text"
                className={classes.input}
                placeholder={t('Input username') ?? ''}
                autofocus={isFocused}
                onChange={onChangeUsername}
                value={username}
              />
              <Input
                type="text"
                className={classes.input}
                placeholder={t('Input password') ?? ''}
                onChange={onChangePassword}
                value={password}
              />
              <Button
                className={classes.loginBtn}
                variant="outline"
                onClick={onLoginClick}
                disabled={isLoading}
              >
                {t('Log in')}
              </Button>
            </VStack>
          }
          off={
            <div className={classNames(classes.LoginForm, {}, [className])}>
              <TextDeprecated title={t('Auth form')} />
              {error && (
                <TextDeprecated text={t(error)} theme={TextTheme.ERROR} />
              )}
              <InputDeprecated
                type="text"
                className={classes.input}
                placeholder={t('Input username') ?? ''}
                autofocus={isFocused}
                onChange={onChangeUsername}
                value={username}
              />
              <InputDeprecated
                type="text"
                className={classes.input}
                placeholder={t('Input password') ?? ''}
                onChange={onChangePassword}
                value={password}
              />
              <ButtonDeprecated
                className={classes.loginBtn}
                theme={ButtonTheme.OUTLINE}
                onClick={onLoginClick}
                disabled={isLoading}
              >
                {t('Log in')}
              </ButtonDeprecated>
            </div>
          }
        />
      </DynamicModuleLoader>
    );
  },
);

export default LoginForm;
