import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Code } from 'shared/ui/Code/Code';
import { ArticleCodeBlock } from '../../model/types/article';
import classes from './ArticleCodeBlockComponent.module.scss';

interface ArticleCodeBlockComponentProps {
  className?: string;
  block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(({ className, block }: ArticleCodeBlockComponentProps) => {
  const mods: Mods = {};

  return (
    <div className={classNames(classes.ArticleCodeBlockComponent, mods, [className])}>
      <Code block={block.code} />
    </div>
  );
});
