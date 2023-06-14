import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticlePageInfiniteList } from './ArticlePageInfiniteList';

export default {
  title: 'pages/ArticlesPage/ArticlesPageInfiniteList',
  component: ArticlePageInfiniteList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticlePageInfiniteList>;

const Template: ComponentStory<typeof ArticlePageInfiniteList> = (args) => <ArticlePageInfiniteList {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
