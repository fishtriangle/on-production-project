import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';

import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Icon } from 'shared/ui/Icon/Icon';
import EyeIcon from 'shared/assets/icons/eye-icon.svg';
import { Card } from 'shared/ui/Card/Card';
// import { useHover } from 'shared/lib/hooks/useHover/useHover';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import classes from './ArticleListItem.module.scss';
import {
  Article, ArticleBlockType, ArticleTextBlock, ArticleView,
} from '../../model/types/article';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
}

export const ArticleListItem = memo(({ className, article, view }: ArticleListItemProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const mods: Mods = {};

  const types = <Text text={article.type.join(', ')} className={classes.types} />;
  const views = (
    <>
      <Text text={String(article.views)} className={classes.views} />
      <Icon Svg={EyeIcon} className={classes.icon} />
    </>
  );

  // const [isHover, bindHover] = useHover();

  const onOpenArticle = useCallback(() => {
    navigate(RoutePath.articleDetails + article.id);
  }, [article.id, navigate]);

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
            <Button onClick={onOpenArticle} theme={ButtonTheme.OUTLINE}>
              {t('Read more...')}
            </Button>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div
      /* {...bindHover} */
      className={classNames(classes.ArticleListItem, mods, [className, classes[view]])}
    >
      <Card onClick={onOpenArticle}>
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
    </div>
  );
});
