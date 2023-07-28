import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import EyeIcon from '@/shared/assets/icons/eye-icon.svg';
import { getRouteArticleDetails } from '@/shared/const/router';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/depricated/AppLink';
import { Avatar } from '@/shared/ui/depricated/Avatar';
import { Button, ButtonTheme } from '@/shared/ui/depricated/Button';
import { Card } from '@/shared/ui/depricated/Card';
import { Icon } from '@/shared/ui/depricated/Icon';
import { Skeleton } from '@/shared/ui/depricated/Skeleton';
import { Text } from '@/shared/ui/depricated/Text';
import { AppImage } from '@/shared/ui/redesigned/AppImage/AppImage';

import { ArticleBlockType } from '../../../model/consts/ArticleConsts';
import { ArticleTextBlock } from '../../../model/types/article';
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent/ArticleTextBlockComponent';
import classes from '../ArticleListItem.module.scss';
import { ArticleListItemProps } from '../ArticleListItemProps';

export const ArticleListItemDeprecated = memo((props: ArticleListItemProps) => {
  const { className, article, view, target } = props;

  const { t } = useTranslation();

  const mods: Mods = {};

  const types = (
    <Text text={article.type.join(', ')} className={classes.types} />
  );
  const views = (
    <>
      <Text text={String(article.views)} className={classes.views} />
      <Icon Svg={EyeIcon} className={classes.icon} />
    </>
  );

  // const [isHover, bindHover] = useHover();

  if (view === 'LIST') {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    return (
      <div
        data-testid="ArticlesListItem"
        className={classNames(classes.ArticleListItem, mods, [
          className,
          classes[view],
        ])}
      >
        <Card>
          <div className={classes.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text text={article.user.username} className={classes.username} />
            <Text text={article.createdAt} className={classes.date} />
          </div>
          <Text title={article.title} className={classes.title} />
          {types}
          <AppImage
            fallback={<Skeleton width="100%" height={250} />}
            src={article.image}
            alt={article.title}
            className={classes.image}
          />
          {textBlock && (
            <ArticleTextBlockComponent
              block={textBlock}
              className={classes.textBlock}
            />
          )}
          <div className={classes.footer}>
            <AppLink to={getRouteArticleDetails(article.id)}>
              <Button theme={ButtonTheme.OUTLINE}>{t('Read more...')}</Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AppLink
      data-testid="ArticlesListItem"
      target={target}
      /* {...bindHover} */
      to={getRouteArticleDetails(article.id)}
      className={classNames(classes.ArticleListItem, mods, [
        className,
        classes[view],
      ])}
    >
      <Card className={classes.card}>
        <div className={classes.imageWrapper}>
          <AppImage
            fallback={<Skeleton width={200} height={200} />}
            src={article.image}
            className={classes.image}
            alt={article.title}
          />
          <Text text={article.createdAt} className={classes.date} />
        </div>
        <div className={classes.infoWrapper}>
          {types}
          {views}
        </div>
        <Text text={article.title} className={classes.title} />
      </Card>
    </AppLink>
  );
});
