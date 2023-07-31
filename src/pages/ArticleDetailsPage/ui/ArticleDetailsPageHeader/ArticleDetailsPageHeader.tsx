import React, { memo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getArticleDetailsData } from '@/entities/Article';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';

import { getCanEditArticle } from '../../model/selectors/getArticle';

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = memo(
  ({ className }: ArticleDetailsPageHeaderProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const article = useSelector(getArticleDetailsData);
    const canEdit = useSelector(getCanEditArticle);

    const mods: Mods = {};

    const onBackToListClick = useCallback(() => {
      navigate(getRouteArticles());
    }, [navigate]);

    const onEditArticle = useCallback(() => {
      navigate(getRouteArticleEdit(article?.id || ''));
    }, [article?.id, navigate]);

    return (
      <HStack
        maxWidth
        justify="between"
        className={classNames('', mods, [className])}
      >
        <Button theme={ButtonTheme.OUTLINE} onClick={onBackToListClick}>
          {t('Back to article list')}
        </Button>
        {canEdit && (
          <Button theme={ButtonTheme.OUTLINE} onClick={onEditArticle}>
            {t('Edit')}
          </Button>
        )}
      </HStack>
    );
  },
);
