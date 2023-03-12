import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getProfileReadonly, profileActions, updateProfileData } from 'entities/Profile';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import classes from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
  const { t } = useTranslation('profile');
  const dispatch = useAppDispatch();

  const readonly = useSelector(getProfileReadonly);

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  return (
    <div className={classNames(classes.ProfilePageHeader, {}, [className])}>
      <Text title={t('Profile')} />
      {readonly
        ? (
          <Button
            theme={ButtonTheme.OUTLINE}
            className={classes.editBtn}
            onClick={onEdit}
          >
            {t('Edit')}
          </Button>
        )
        : (
          <div>
            <Button
              theme={ButtonTheme.OUTLINE}
              className={classes.saveBtn}
              onClick={onSave}
            >
              {t('Save')}
            </Button>
            <Button
              theme={ButtonTheme.OUTLINE_RED}
              className={classes.editBtn}
              onClick={onCancelEdit}
            >
              {t('Cancel')}
            </Button>
          </div>
        )}
    </div>
  );
};
