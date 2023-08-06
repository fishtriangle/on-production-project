import { memo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { HStack } from '@/shared/ui/redesigned/Stack';

import classes from './AddNewComment.module.scss';
import { getAddNewCommentText } from '../../model/selectors/addNewCommentSelectors';
import {
  addNewCommentActions,
  addNewCommentReducer,
} from '../../model/slice/addNewCommentSlice';

export interface AddNewCommentProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
  addNewComment: addNewCommentReducer,
};

const AddNewComment = memo((props: AddNewCommentProps) => {
  const { className, onSendComment } = props;
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const text = useSelector(getAddNewCommentText);
  // const error = useSelector(getAddNewCommentError);

  const mods: Mods = {};

  const onNewCommentTextChange = useCallback(
    (value: string) => {
      dispatch(addNewCommentActions.setText(value));
    },
    [dispatch],
  );

  const onSendCommentHandler = useCallback(() => {
    onSendComment(text || '');
    onNewCommentTextChange('');
  }, [onNewCommentTextChange, onSendComment, text]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <ToggleFeatures
        featureName="isSiteRedesigned"
        on={
          <Card paddings="24" border="round" maxWidth>
            <HStack
              data-testid="AddNewCommentForm"
              justify="between"
              maxWidth
              className={classNames(classes.AddNewCommentRedesigned, mods, [
                className,
              ])}
              gap="16"
            >
              <Input
                data-testid="AddNewCommentForm.input"
                className={classes.input}
                placeholder={t('Input comment here') ?? ''}
                value={text}
                onChange={onNewCommentTextChange}
              />
              <Button
                data-testid="AddNewCommentForm.button"
                onClick={onSendCommentHandler}
                variant="outline"
              >
                {t('Send')}
              </Button>
            </HStack>
          </Card>
        }
        off={
          <HStack
            data-testid="AddNewCommentForm"
            justify="between"
            maxWidth
            className={classNames(classes.AddNewComment, mods, [className])}
          >
            <InputDeprecated
              data-testid="AddNewCommentForm.input"
              className={classes.input}
              placeholder={t('Input comment here') ?? ''}
              value={text}
              onChange={onNewCommentTextChange}
            />
            <ButtonDeprecated
              data-testid="AddNewCommentForm.button"
              onClick={onSendCommentHandler}
              theme={ButtonTheme.OUTLINE}
            >
              {t('Send')}
            </ButtonDeprecated>
          </HStack>
        }
      />
    </DynamicModuleLoader>
  );
});

export default AddNewComment;
