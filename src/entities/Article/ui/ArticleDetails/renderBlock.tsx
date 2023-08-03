import classes from './ArticleDetails.module.scss';
import { ArticleBlockType } from '../../model/consts/ArticleConsts';
import { ArticleBlock } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTableBlockComponent } from '../ArticleTableBlockComponent/ArticleTableBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

export const renderBlock = (block: ArticleBlock) => {
  switch (block.type) {
    case ArticleBlockType.CODE:
      return (
        <ArticleCodeBlockComponent
          block={block}
          className={classes.block}
          key={block.id}
        />
      );
    case ArticleBlockType.IMAGE:
      return (
        <ArticleImageBlockComponent
          block={block}
          className={classes.block}
          key={block.id}
        />
      );
    case ArticleBlockType.TEXT:
      return (
        <ArticleTextBlockComponent
          block={block}
          className={classes.block}
          key={block.id}
        />
      );
    case ArticleBlockType.TABLE:
      return (
        <ArticleTableBlockComponent
          block={block}
          className={classes.block}
          key={block.id}
        />
      );
    default:
      return null;
  }
};
