import React, { memo, Suspense, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { CommentList } from '@/entities/Comment';
import { AddNewComment } from '@/features/AddNewComment';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import {
  Text as TextDeprecated,
  TextSize,
  TextTheme,
} from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { PageLoader } from '@/widgets/PageLoader';

import {
  getArticleCommentsError,
  getArticleCommentsIsLoading,
} from '../../model/selectors/getComments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';

interface ArticleDetailsPageCommentsProps {
  className?: string;
  id?: string;
}

export const ArticleDetailsPageComments = memo(
  ({ className, id }: ArticleDetailsPageCommentsProps) => {
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
          <ToggleFeatures
            featureName="isSiteRedesigned"
            on={<Text size="size_l" title={t('Comments') ?? ''} />}
            off={
              <TextDeprecated size={TextSize.L} title={t('Comments') ?? ''} />
            }
          />

          <AddNewComment onSendComment={onSendComment} />
          {!commentsError && (
            <CommentList comments={comments} isLoading={commentsIsLoading} />
          )}
          {commentsError && (
            <ToggleFeatures
              featureName="isSiteRedesigned"
              on={
                <Text
                  variant="error"
                  title={t('Comments loading error!') ?? ''}
                />
              }
              off={
                <TextDeprecated
                  theme={TextTheme.ERROR}
                  title={t('Comments loading error!') ?? ''}
                />
              }
            />
          )}
        </VStack>
      </Suspense>
    );
  },
);
