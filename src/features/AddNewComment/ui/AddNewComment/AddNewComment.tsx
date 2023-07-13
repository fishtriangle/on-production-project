import { memo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ButtonTheme } from '@/shared/ui/depricated/Button';
import { Input } from '@/shared/ui/depricated/Input';
import { HStack } from '@/shared/ui/depricated/Stack';

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
      <HStack
        data-testid="AddNewCommentForm"
        justify="between"
        maxWidth
        className={classNames(classes.AddNewComment, mods, [className])}
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
          theme={ButtonTheme.OUTLINE}
        >
          {t('Send')}
        </Button>
      </HStack>
    </DynamicModuleLoader>
  );
});

export default AddNewComment;
