import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import classes from './ArticleImageBlockComponent.module.scss';
import { ArticleImageBlock } from '../../model/types/article';

interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(({ className, block }: ArticleImageBlockComponentProps) => {
  const mods: Mods = {};

  return (
    <div className={classNames(classes.ArticleImageBlockComponent, mods, [className])}>
      <img src={block.src} className={classes.image} alt={block.title} />
      {block.title && (
        <Text text={block.title} align={TextAlign.CENTER} />
      )}
    </div>
  );
});
