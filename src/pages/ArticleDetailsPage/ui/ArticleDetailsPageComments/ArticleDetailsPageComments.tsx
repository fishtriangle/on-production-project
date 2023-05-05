import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { memo, Suspense, useCallback } from 'react';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { AddNewComment } from 'features/AddNewComment';
import { CommentList } from 'entities/Comment';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { VStack } from 'shared/ui/Stack';
import { PageLoader } from 'widgets/PageLoader';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import {
  getArticleCommentsError,
  getArticleCommentsIsLoading,
} from '../../model/selectors/getComments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import {
  fetchCommentsByArticleId,
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';

interface ArticleDetailsPageCommentsProps {
  className?: string;
  id?: string
}

export const ArticleDetailsPageComments = memo(({ className, id }: ArticleDetailsPageCommentsProps) => {
  const { t } = useTranslation();

  const mods: Mods = {};

  const dispatch = useAppDispatch();
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

  return (
    <Suspense fallback={<PageLoader />}>
      <VStack gap="16" maxWidth className={classNames('', mods, [className])}>
        <Text
          size={TextSize.L}
          title={t('Comments') ?? ''}
        />
        <AddNewComment onSendComment={onSendComment} />
        {!commentsError && (
          <CommentList
            comments={comments}
            isLoading={commentsIsLoading}
          />
        )}
        {commentsError && (
          <Text theme={TextTheme.ERROR} title={t('Comments loading error!') ?? ''} />
        ) }
      </VStack>
    </Suspense>
  );
});
