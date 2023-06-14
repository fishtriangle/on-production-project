import { memo, useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { TabItem, Tabs } from '@/shared/ui/Tabs';

import classes from './ArticleTypeTabs.module.scss';
import { ArticleType } from '../../model/consts/ArticleConsts';

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo(({ className, value, onChangeType }: ArticleTypeTabsProps) => {
  const { t } = useTranslation();

  const tabs = useMemo<TabItem<ArticleType>[]>(() => [
    {
      value: ArticleType.ALL,
      content: t('All articles'),
    },
    {
      value: ArticleType.JS,
      content: t('JavaScript'),
    },
    {
      value: ArticleType.SCIENCE,
      content: t('Science'),
    },
    {
      value: ArticleType.ECONOMICS,
      content: t('Economics'),
    },
  ], [t]);

  const mods: Mods = {};

  return (
    <Tabs
      tabs={tabs}
      value={value}
      onTabClick={(tab: TabItem<ArticleType>) => onChangeType(tab.value)}
      className={classNames(classes.ArticleTypeTabs, mods, [className])}
    />
  );
});
