import { memo, useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import { ArticleType } from '@/entities/Article';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { TabItem, Tabs as TabsDeprecated } from '@/shared/ui/deprecated/Tabs';
import { Tabs } from '@/shared/ui/redesigned/Tabs';

import classes from './ArticleTypeTabs.module.scss';

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo(
  ({ className, value, onChangeType }: ArticleTypeTabsProps) => {
    const { t } = useTranslation();

    const tabs = useMemo<TabItem<ArticleType>[]>(
      () => [
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
      ],
      [t],
    );

    const mods: Mods = {};

    return (
      <ToggleFeatures
        featureName="isSiteRedesigned"
        on={
          <Tabs
            direction="column"
            tabs={tabs}
            value={value}
            onTabClick={(tab: TabItem<ArticleType>) => onChangeType(tab.value)}
            className={classNames(classes.ArticleTypeTabs, mods, [className])}
          />
        }
        off={
          <TabsDeprecated
            tabs={tabs}
            value={value}
            onTabClick={(tab: TabItem<ArticleType>) => onChangeType(tab.value)}
            className={classNames(classes.ArticleTypeTabs, mods, [className])}
          />
        }
      />
    );
  },
);
