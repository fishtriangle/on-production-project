import { memo } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';

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
        {block.title && (
          <ToggleFeatures
            featureName="isSiteRedesigned"
            on={<Text title={block.title} className={classes.title} />}
            off={
              <TextDeprecated title={block.title} className={classes.title} />
            }
          />
        )}
        {block.paragraphs.map((paragraph) => (
          <ToggleFeatures
            featureName="isSiteRedesigned"
            on={
              <Text
                key={paragraph}
                text={paragraph}
                className={classes.paragraph}
              />
            }
            off={
              <TextDeprecated
                key={paragraph}
                text={paragraph}
                className={classes.paragraph}
              />
            }
          />
        ))}
      </div>
    );
  },
);
