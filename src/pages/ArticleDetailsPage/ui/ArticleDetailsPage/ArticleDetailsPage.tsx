import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { ArticleDetails } from 'entities/Article';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddNewComment } from 'features/AddNewComment';

import {
  fetchCommentsByArticleId,
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { getArticleCommentsError, getArticleCommentsIsLoading } from '../../model/selectors/getComments';
import classes from './ArticleDetailsPage.module.scss';
import { articleDetailsCommentsReducer, getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { t } = useTranslation('article-details');
  const dispatch = useAppDispatch();

  const { id } = useParams<{id: string}>();

  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const commentsError = useSelector(getArticleCommentsError);

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
    },
    [dispatch],
  );

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });

  const mods: Mods = {};

  if (!id) {
    return (
      <div className={classNames(classes.ArticleDetailsPage, mods, [className])}>
        {t('Article not found')}
      </div>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(classes.ArticleDetailsPage, mods, [className])}>
        <ArticleDetails id={id} />
        <Text title={t('Comments')} className={classes.commentTitle} />
        <AddNewComment onSendComment={onSendComment} />
        {!commentsError && (
          <CommentList
            comments={comments}
            isLoading={commentsIsLoading}
          />
        )}
        {commentsError && (
          <Text theme={TextTheme.ERROR} title={t('Comments loading error!')} />
        ) }
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
