import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import EyeIcon from '@/shared/assets/icons/import/eye.svg';
import { getRouteArticleDetails } from '@/shared/const/router';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { AppImage } from '@/shared/ui/redesigned/AppImage/AppImage';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import classes from './ArticleListItemRedesigned.module.scss';
import { ArticleBlockType } from '../../../model/consts/ArticleConsts';
import { ArticleTextBlock } from '../../../model/types/article';
import { ArticleListItemProps } from '../ArticleListItemProps';

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
  const { className, article, view, target } = props;

  const { t } = useTranslation();

  const mods: Mods = {};

  const userInfo = (
    <>
      <Avatar size={32} src={article.user.avatar} className={classes.avatar} />
      <Text text={article.user.username} bold />
    </>
  );

  const views = (
    <HStack gap="8">
      <Icon Svg={EyeIcon} className={classes.icon} />
      <Text text={String(article.views)} className={classes.views} />
    </HStack>
  );

  // const [isHover, bindHover] = useHover();

  if (view === 'LIST') {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    return (
      <Card
        maxWidth
        paddings="24"
        data-testid="ArticlesListItem"
        className={classNames(classes.ArticleListItem, mods, [
          className,
          classes[view],
        ])}
      >
        <VStack maxWidth gap="16">
          <HStack gap="8" maxWidth>
            {userInfo}
            <Text text={article.createdAt} />
          </HStack>
          <Text title={article.title} bold />
          <Text title={article.subtitle} bold size="size_s" />
          <AppImage
            fallback={<Skeleton width="100%" height={250} />}
            src={article.image}
            alt={article.title}
            className={classes.img}
          />
          {textBlock?.paragraphs && (
            <Text
              text={textBlock.paragraphs.slice(0, 2).join(' ')}
              className={classes.textBlock}
            />
          )}
          <HStack maxWidth justify="between">
            <AppLink to={getRouteArticleDetails(article.id)}>
              <Button variant="outline">{t('Read more...')}</Button>
            </AppLink>
            {views}
          </HStack>
        </VStack>
      </Card>
    );
  }

  return (
    <AppLink
      data-testid="ArticlesListItem"
      target={target}
      to={getRouteArticleDetails(article.id)}
      className={classNames(classes.ArticleListItem, mods, [
        className,
        classes[view],
      ])}
    >
      <Card className={classes.card} border="semi" paddings="0">
        <AppImage
          fallback={<Skeleton width="100%" height={200} />}
          src={article.image}
          className={classes.image}
          alt={article.title}
        />
        <VStack className={classes.info} gap="4">
          <Text text={article.title} className={classes.title} />
          <VStack gap="4" className={classes.footer} maxWidth>
            <HStack justify="between" maxWidth>
              <Text text={article.createdAt} className={classes.date} />
              {views}
            </HStack>
            <HStack gap="4">{userInfo}</HStack>
          </VStack>
        </VStack>
      </Card>
    </AppLink>
  );
});
