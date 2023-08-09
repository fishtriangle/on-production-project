import { ReactNode, useCallback } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/redesigned/Card';
import { Flex, FlexDirection } from '@/shared/ui/redesigned/Stack/Flex/Flex';

import classes from './Tabs.module.scss';

export interface TabItem<T extends string> {
  value: T;
  content: ReactNode;
}

interface TabsProps<T extends string> {
  className?: string;
  tabs?: TabItem<T>[];
  value: string;
  onTabClick: (tab: TabItem<T>) => void;
  direction?: FlexDirection;
}

export const Tabs = <T extends string>(props: TabsProps<T>) => {
  const { className, tabs, value, onTabClick, direction = 'row' } = props;

  const mods: Mods = {};

  const clickHandler = useCallback(
    (tab: TabItem<T>) => () => {
      onTabClick(tab);
    },
    [onTabClick],
  );

  return (
    <Flex
      direction={direction}
      className={classNames(classes.Tabs, mods, [className])}
      gap="8"
      align="start"
    >
      {tabs?.map((tab) => {
        const isSelected = tab.value === value;
        return (
          <Card
            variant={isSelected ? 'light' : 'normal'}
            className={classNames(classes.tab, {
              [classes.selected]: isSelected,
            })}
            key={tab.value}
            onClick={clickHandler(tab)}
            border="semi"
            paddings={isSelected ? '16' : '8'}
          >
            {tab.content}
          </Card>
        );
      })}
    </Flex>
  );
};
