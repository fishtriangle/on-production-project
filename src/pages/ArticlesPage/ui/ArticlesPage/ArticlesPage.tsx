import { classNames, Mods } from 'shared/lib/classNames/classNames';

import { memo } from 'react';
import { ArticleList } from 'entities/Article';
import { articleMock } from 'shared/lib/mock/mock';
import classes from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const mods: Mods = {};

  return (
    <div className={classNames(classes.ArticlesPage, mods, [className])}>
      <ArticleList
        isLoading
        articles={
          new Array(16)
            .fill(0)
            .map((_, index) => ({
              ...articleMock,
              id: String(index),
            }))
        }
        view="LIST"
      />
    </div>
  );
};

export default memo(ArticlesPage);
