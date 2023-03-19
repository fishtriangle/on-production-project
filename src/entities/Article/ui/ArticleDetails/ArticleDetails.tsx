import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticleById } from 'entities/Article/model/service/fetchArticleById/fetchArticleById';
import {
  Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import EyeIcon from 'shared/assets/icons/eye-icon.svg';
import CalendarIcon from 'shared/assets/icons/calendar-icon.svg';

import { Icon } from 'shared/ui/Icon/Icon';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/getArticleDetails';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import classes from './ArticleDetails.module.scss';
import { ArticleBlock, ArticleBlockType } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleTableBlockComponent } from '../ArticleTableBlockComponent/ArticleTableBlockComponent';

interface ArticleDetailsProps {
  className?: string;
  id: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const {
    className,
    id,
  } = props;
  const { t } = useTranslation('article-details');

  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const error = useSelector(getArticleDetailsError);
  const article = useSelector(getArticleDetailsData);

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
    case ArticleBlockType.CODE:
      return <ArticleCodeBlockComponent block={block} className={classes.block} key={block.id} />;
    case ArticleBlockType.IMAGE:
      return <ArticleImageBlockComponent block={block} className={classes.block} key={block.id} />;
    case ArticleBlockType.TEXT:
      return <ArticleTextBlockComponent block={block} className={classes.block} key={block.id} />;
    case ArticleBlockType.TABLE:
      return <ArticleTableBlockComponent block={block} className={classes.block} key={block.id} />;
    default:
      return null;
    }
  }, []);

  let content;

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

  const mods: Mods = {};

  if (isLoading) {
    content = (
      <>
        <Skeleton width={200} height={200} border="50%" className={classes.avatar} />
        <Skeleton width={300} height={32} className={classes.title} />
        <Skeleton width={600} height={24} className={classes.skeleton} />
        <Skeleton width="100%" height={200} className={classes.skeleton} />
        <Skeleton width="100%" height={200} className={classes.skeleton} />
      </>
    );
  } else if (error) {
    content = (
      <Text
        title={t('Error!')}
        theme={TextTheme.ERROR}
        align={TextAlign.CENTER}
      />
    );
  } else {
    content = (
      <>
        <div className={classes.avatarWrapper}>
          <Avatar size={200} src={article?.image} className={classes.avatar} />
        </div>
        <Text
          title={article?.title}
          text={article?.subtitle}
          className={classes.title}
          size={TextSize.L}
        />
        <div className={classes.articleInfo}>
          <Icon Svg={EyeIcon} className={classes.icon} />
          <Text text={String(article?.views)} />
        </div>
        <div className={classes.articleInfo}>
          <Icon Svg={CalendarIcon} className={classes.icon} />
          <Text text={article?.createdAt} />
        </div>
        {article?.blocks.map((block) => (
          <div key={block.id}>
            {renderBlock(block)}
          </div>
        ))}
      </>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(classes.ArticleDetails, mods, [className])}>
        {content}
      </div>
    </DynamicModuleLoader>

  );
});
