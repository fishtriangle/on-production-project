import { memo } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Code } from '@/shared/ui/deprecated/Code';

import classes from './ArticleCodeBlockComponent.module.scss';
import { ArticleCodeBlock } from '../../model/types/article';

interface ArticleCodeBlockComponentProps {
  className?: string;
  block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(
  ({ className, block }: ArticleCodeBlockComponentProps) => {
    const mods: Mods = {};

    return (
      <div
        className={classNames(classes.ArticleCodeBlockComponent, mods, [
          className,
        ])}
      >
        <Code block={block.code} />
      </div>
    );
  },
);
