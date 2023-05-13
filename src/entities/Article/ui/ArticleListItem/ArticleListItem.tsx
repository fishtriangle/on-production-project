import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text/Text';
import { Icon } from '@/shared/ui/Icon/Icon';
import EyeIcon from '@/shared/assets/icons/eye-icon.svg';
import { Card } from '@/shared/ui/Card/Card';
// import { useHover } from 'shared/lib/hooks/useHover/useHover';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';

import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { ArticleBlockType } from '../../model/consts/ArticleConsts';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import classes from './ArticleListItem.module.scss';
import {
  Article, ArticleTextBlock, ArticleView,
} from '../../model/types/article';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const {
    className, article, view, target,
  } = props;

  const { t } = useTranslation();

  const mods: Mods = {};

  const types = <Text text={article.type.join(', ')} className={classes.types} />;
  const views = (
    <>
      <Text text={String(article.views)} className={classes.views} />
      <Icon Svg={EyeIcon} className={classes.icon} />
    </>
  );

  // const [isHover, bindHover] = useHover();

  if (view === 'LIST') {
    const textBlock = article.blocks
      .find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;

    return (
      <div
        className={classNames(classes.ArticleListItem, mods, [className, classes[view]])}
      >
        <Card>
          <div className={classes.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text text={article.user.username} className={classes.username} />
            <Text text={article.createdAt} className={classes.date} />
          </div>
          <Text title={article.title} className={classes.title} />
          {types}
          <img src={article.image} alt={article.title} className={classes.image} />
          {textBlock && (
            <ArticleTextBlockComponent block={textBlock} className={classes.textBlock} />
          )}
          <div className={classes.footer}>
            <AppLink to={RoutePath.articleDetails + article.id}>
              <Button theme={ButtonTheme.OUTLINE}>
                {t('Read more...')}
              </Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AppLink
      target={target}
      /* {...bindHover} */
      to={RoutePath.articleDetails + article.id}
      className={classNames(classes.ArticleListItem, mods, [className, classes[view]])}
    >
      <Card className={classes.card}>
        <div className={classes.imageWrapper}>
          <img src={article.image} className={classes.image} alt={article.title} />
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
