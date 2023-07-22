import { memo, SVGProps, VFC } from 'react';

import { ArticleView } from '@/entities/Article';
import ListIcon from '@/shared/assets/icons/import/burger.svg';
import TiledIcon from '@/shared/assets/icons/import/tile.svg';
import ListIconDeprecated from '@/shared/assets/icons/list.svg';
import TableIconDeprecated from '@/shared/assets/icons/table.svg';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/depricated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/depricated/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { HStack } from '@/shared/ui/redesigned/Stack';

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
    icon: toggleFeatures({
      name: 'isSiteRedesigned',
      on: () => TiledIcon,
      off: () => TableIconDeprecated,
    }),
  },
  {
    view: 'LIST',
    icon: toggleFeatures({
      name: 'isSiteRedesigned',
      on: () => ListIcon,
      off: () => ListIconDeprecated,
    }),
  },
];

export const ArticleViewSelector = memo(
  ({ className, view, onViewClick }: ArticleViewSelectorProps) => {
    const mods: Mods = {};

    const onClick = (newView: ArticleView) => () => {
      onViewClick?.(newView);
    };

    return (
      <ToggleFeatures
        featureName="isSiteRedesigned"
        on={
          <Card
            className={classNames(classes.ArticleViewSelectorRedesigned, mods, [
              className,
            ])}
            border="round"
          >
            <HStack gap="8">
              {viewTypes.map((viewType) => (
                <Icon
                  key={viewType.view}
                  clickable
                  onClick={onClick(viewType.view)}
                  Svg={viewType.icon}
                  className={classNames('', {
                    [classes.notActive]: view !== viewType.view,
                  })}
                />
              ))}
            </HStack>
          </Card>
        }
        off={
          <div
            className={classNames(classes.ArticleViewSelector, mods, [
              className,
            ])}
          >
            {viewTypes.map((viewType) => (
              <ButtonDeprecated
                key={viewType.view}
                theme={ButtonTheme.CLEAR}
                onClick={onClick(viewType.view)}
              >
                <IconDeprecated
                  Svg={viewType.icon}
                  className={classNames('', {
                    [classes.active]: view === viewType.view,
                  })}
                />
              </ButtonDeprecated>
            ))}
          </div>
        }
      />
    );
  },
);
