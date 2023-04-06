import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, { memo, Suspense, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { ArticleDetails } from 'entities/Article';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddNewComment } from 'features/AddNewComment';
import { PageLoader } from 'widgets/PageLoader';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

import { Page } from 'shared/ui/Page/Page';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
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
  const navigate = useNavigate();

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

  const onBackToListClick = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });

  const mods: Mods = {};

  if (!id) {
    return (
      <Page className={classNames(classes.ArticleDetailsPage, mods, [className])}>
        {t('Article not found')}
      </Page>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Suspense fallback={<PageLoader />}>
        <Page className={classNames(classes.ArticleDetailsPage, mods, [className])}>
          <Button theme={ButtonTheme.OUTLINE} onClick={onBackToListClick}>
            {t('Back to article list')}
          </Button>
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
        </Page>
      </Suspense>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
