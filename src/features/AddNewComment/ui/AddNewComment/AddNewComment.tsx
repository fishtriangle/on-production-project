import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { addNewCommentActions, addNewCommentReducer } from '../../model/slice/addNewCommentSlice';
import {
  // getAddNewCommentError,
  getAddNewCommentText,
} from '../../model/selectors/addNewCommentSelectors';
import classes from './AddNewComment.module.scss';

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

  const onNewCommentTextChange = useCallback((value: string) => {
    dispatch(addNewCommentActions.setText(value));
  }, [dispatch]);

  const onSendCommentHandler = useCallback(() => {
    onSendComment(text || '');
    onNewCommentTextChange('');
  }, [onNewCommentTextChange, onSendComment, text]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(classes.AddNewComment, mods, [className])}>
        <Input
          className={classes.input}
          placeholder={t('Input comment here')}
          value={text || ''}
          onChange={onNewCommentTextChange}
        />
        <Button
          onClick={onSendCommentHandler}
          theme={ButtonTheme.OUTLINE}
        >
          {t('Send')}
        </Button>
      </div>
    </DynamicModuleLoader>
  );
});

export default AddNewComment;
