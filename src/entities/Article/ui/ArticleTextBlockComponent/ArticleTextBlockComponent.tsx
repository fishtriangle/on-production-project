import { memo } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/depricated/Text';

import classes from './ArticleTextBlockComponent.module.scss';
import { ArticleTextBlock } from '../../model/types/article';

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(
  ({ className, block }: ArticleTextBlockComponentProps) => {
    const mods: Mods = {};

    return (
      <div
        className={classNames(classes.ArticleTextBlockComponent, mods, [
          className,
        ])}
      >
        {block.title && <Text title={block.title} className={classes.title} />}
        {block.paragraphs.map((paragraph) => (
          <Text
            key={paragraph}
            text={paragraph}
            className={classes.paragraph}
          />
        ))}
      </div>
    );
  },
);
