import { memo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import classes from './ArticleTableBlockComponent.module.scss';
import { ArticleTableBlock } from '../../model/types/article';

interface ArticleTableBlockComponentProps {
  className?: string;
  block: ArticleTableBlock;
}

export const ArticleTableBlockComponent = memo(({ className, block }: ArticleTableBlockComponentProps) => {
  const mods: Mods = {};

  return (
    <table className={classNames(classes.ArticleTableBlockComponent, mods, [className])}>
      <tbody>
        {block.rows.map((row, index) => (
        // eslint-disable-next-line react/no-array-index-key
          <tr key={index}>
            {row.map((col, i) => (
            // eslint-disable-next-line react/no-array-index-key
              <td key={`${index}-${i}`}>{col}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
});
