import { memo, SVGProps, VFC } from 'react';

import { ArticleView } from '@/entities/Article';
import ListIcon from '@/shared/assets/icons/list.svg';
import TableIcon from '@/shared/assets/icons/table.svg';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/depricated/Button';
import { Icon } from '@/shared/ui/depricated/Icon';

import classes from './ArticleViewSelector.module.scss';

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

export const ArticleViewSelector = memo(
  ({ className, view, onViewClick }: ArticleViewSelectorProps) => {
    const mods: Mods = {};

    const onClick = (newView: ArticleView) => () => {
      onViewClick?.(newView);
    };

    return (
      <div
        className={classNames(classes.ArticleViewSelector, mods, [className])}
      >
        {viewTypes.map((viewType) => (
          <Button
            key={viewType.view}
            theme={ButtonTheme.CLEAR}
            onClick={onClick(viewType.view)}
          >
            <Icon
              Svg={viewType.icon}
              className={classNames('', {
                [classes.active]: view === viewType.view,
              })}
            />
          </Button>
        ))}
      </div>
    );
  },
);
