import { memo, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import CalendarIcon from '@/shared/assets/icons/calendar-icon.svg';
import EyeIcon from '@/shared/assets/icons/eye-icon.svg';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import {
  Text as TextDeprecated,
  TextAlign,
  TextSize,
  TextTheme,
} from '@/shared/ui/deprecated/Text';
import { AppImage } from '@/shared/ui/redesigned/AppImage/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import classes from './ArticleDetails.module.scss';
import { renderBlock } from './renderBlock';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/getArticleDetails';
import { fetchArticleById } from '../../model/service/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';

interface ArticleDetailsProps {
  className?: string;
  id?: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

const ArticleDetailsDeprecated = () => {
  const article = useSelector(getArticleDetailsData);
  return (
    <>
      <HStack justify="center" maxWidth className={classes.avatarWrapper}>
        <Avatar size={200} src={article?.image} className={classes.avatar} />
      </HStack>
      <VStack
        gap="4"
        maxWidth
        className={classes.header}
        data-testid="ArticleDetails.title"
      >
        <TextDeprecated
          title={article?.title}
          text={article?.subtitle}
          className={classes.title}
          size={TextSize.L}
        />
        <HStack gap="8" className={classes.articleInfo}>
          <Icon Svg={EyeIcon} className={classes.icon} />
          <TextDeprecated text={String(article?.views)} />
        </HStack>
        <HStack gap="8" className={classes.articleInfo}>
          <Icon Svg={CalendarIcon} className={classes.icon} />
          <TextDeprecated text={article?.createdAt} />
        </HStack>
      </VStack>

      {article?.blocks.map((block) => (
        <div key={block.id} className={classes.block}>
          {renderBlock(block)}
        </div>
      ))}
    </>
  );
};

const ArticleDetailsRedesigned = () => {
  const article = useSelector(getArticleDetailsData);

  return (
    <>
      <Text title={article?.title} size="size_l" bold />
      <Text title={article?.subtitle} />
      <AppImage
        src={article?.image}
        fallback={<Skeleton width="100%" height={420} border="16px" />}
        className={classes.image}
      />

      {article?.blocks.map((block) => (
        <div key={block.id} className={classes.block}>
          {renderBlock(block)}
        </div>
      ))}
    </>
  );
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { className, id } = props;
  const { t } = useTranslation('article-details');

  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const error = useSelector(getArticleDetailsError);

  let content;

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

  const mods: Mods = {};

  if (isLoading) {
    content = (
      <VStack gap="16">
        <SkeletonDeprecated
          width={200}
          height={200}
          border="50%"
          className={classes.avatar}
        />
        <SkeletonDeprecated width={300} height={32} className={classes.title} />
        <SkeletonDeprecated
          width={600}
          height={24}
          className={classes.skeleton}
        />
        <SkeletonDeprecated
          width="100%"
          height={200}
          className={classes.skeleton}
        />
        <SkeletonDeprecated
          width="100%"
          height={200}
          className={classes.skeleton}
        />
      </VStack>
    );
  } else if (error) {
    content = (
      <TextDeprecated
        title={t('Error!')}
        theme={TextTheme.ERROR}
        align={TextAlign.CENTER}
      />
    );
  } else {
    content = (
      <ToggleFeatures
        featureName="isSiteRedesigned"
        on={<ArticleDetailsRedesigned />}
        off={<ArticleDetailsDeprecated />}
      />
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <VStack
        gap="16"
        maxWidth
        className={classNames(classes.ArticleDetails, mods, [className])}
      >
        {content}
      </VStack>
    </DynamicModuleLoader>
  );
});
