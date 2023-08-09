import { memo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

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
      <ToggleFeatures
        featureName="isSiteRedesigned"
        on={
          <Card border="semi" paddings="24" maxWidth>
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
                      variant="outline"
                      onClick={onEdit}
                      data-testid="EditableProfileCardHeader.EditButton"
                    >
                      {t('Edit')}
                    </Button>
                  ) : (
                    <HStack gap="8">
                      <Button
                        variant="outline"
                        onClick={onSave}
                        data-testid="EditableProfileCardHeader.SaveButton"
                        color="success"
                      >
                        {t('Save')}
                      </Button>
                      <Button
                        color="error"
                        variant="outline"
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
          </Card>
        }
        off={
          <HStack
            maxWidth
            justify="between"
            className={classNames('', {}, [className])}
          >
            <TextDeprecated title={t('Profile') ?? ''} />
            {isEditableProfile && (
              <>
                {readonly ? (
                  <ButtonDeprecated
                    theme={ButtonTheme.OUTLINE}
                    onClick={onEdit}
                    data-testid="EditableProfileCardHeader.EditButton"
                  >
                    {t('Edit')}
                  </ButtonDeprecated>
                ) : (
                  <HStack gap="8">
                    <ButtonDeprecated
                      theme={ButtonTheme.OUTLINE}
                      onClick={onSave}
                      data-testid="EditableProfileCardHeader.SaveButton"
                    >
                      {t('Save')}
                    </ButtonDeprecated>
                    <ButtonDeprecated
                      theme={ButtonTheme.OUTLINE_RED}
                      onClick={onCancelEdit}
                      data-testid="EditableProfileCardHeader.CancelButton"
                    >
                      {t('Cancel')}
                    </ButtonDeprecated>
                  </HStack>
                )}
              </>
            )}
          </HStack>
        }
      />
    );
  },
);
