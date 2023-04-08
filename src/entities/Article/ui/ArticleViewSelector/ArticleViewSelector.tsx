import { memo, SVGProps, VFC } from 'react';

import { classNames, Mods } from 'shared/lib/classNames/classNames';
import ListIcon from 'shared/assets/icons/list.svg';
import TableIcon from 'shared/assets/icons/table.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

import classes from './ArticleViewSelector.module.scss';
import { ArticleView } from '../../model/types/article';

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

interface ViewType {
  view: ArticleView;
  icon: VFC<SVGProps<SVGSVGElement>>;
}

const viewTypes: ViewType[] = [
  {
    view: 'TABLE',
    icon: TableIcon,
  },
  {
    view: 'LIST',
    icon: ListIcon,
  },
];

export const ArticleViewSelector = memo(({ className, view, onViewClick }: ArticleViewSelectorProps) => {
  const mods: Mods = {};

  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView);
  };

  return (
    <div className={classNames(classes.ArticleViewSelector, mods, [className])}>
      {
        viewTypes.map((viewType) => (
          <Button
            key={viewType.view}
            theme={ButtonTheme.CLEAR}
            onClick={onClick(viewType.view)}
          >
            <Icon
              Svg={viewType.icon}
              className={classNames('', { [classes.active]: view === viewType.view })}
            />
          </Button>
        ))
      }
    </div>
  );
});