import { memo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Text } from '@/shared/ui/deprecated/Text';
import { HStack } from '@/shared/ui/redesigned/Stack';

import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { updateProfileData } from '../../model/service/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/profileSlice';

interface EditableProfileCardHeaderProps {
  className?: string;
}

export const EditableProfileCardHeader = memo(
  ({ className }: EditableProfileCardHeaderProps) => {
    const { t } = useTranslation('profile');
    const dispatch = useAppDispatch();

    const readonly = useSelector(getProfileReadonly);
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);

    const isEditableProfile = authData?.id === profileData?.id;

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
      <HStack
        maxWidth
        justify="between"
        className={classNames('', {}, [className])}
      >
        <Text title={t('Profile') ?? ''} />
        {isEditableProfile && (
          <>
            {readonly ? (
              <Button
                theme={ButtonTheme.OUTLINE}
                onClick={onEdit}
                data-testid="EditableProfileCardHeader.EditButton"
              >
                {t('Edit')}
              </Button>
            ) : (
              <HStack gap="8">
                <Button
                  theme={ButtonTheme.OUTLINE}
                  onClick={onSave}
                  data-testid="EditableProfileCardHeader.SaveButton"
                >
                  {t('Save')}
                </Button>
                <Button
                  theme={ButtonTheme.OUTLINE_RED}
                  onClick={onCancelEdit}
                  data-testid="EditableProfileCardHeader.CancelButton"
                >
                  {t('Cancel')}
                </Button>
              </HStack>
            )}
          </>
        )}
      </HStack>
    );
  },
);
