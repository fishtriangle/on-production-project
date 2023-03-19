import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import {
  Text,
} from 'shared/ui/Text/Text';
import { ArticleTextBlock } from '../../model/types/article';
import classes from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(({ className, block }: ArticleTextBlockComponentProps) => {
  const mods: Mods = {};

  return (
    <div className={classNames(classes.ArticleTextBlockComponent, mods, [className])}>
      {block.title && (
        <Text title={block.title} className={classes.title} />
      )}
      {block.paragraphs.map((paragraph) => (
        <Text key={paragraph} text={paragraph} className={classes.paragraph} />
      ))}
    </div>
  );
});
