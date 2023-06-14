import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleList } from './ArticleList';
import { articleMock } from '../../test/articleMock';

export default {
  title: 'entities/Article/ArticleList',
  component: ArticleList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleList>;

const Template: ComponentStory<typeof ArticleList> = (args) => <ArticleList {...args} />;

export const IsLoadingList = Template.bind({});
IsLoadingList.args = {
  isLoading: true,
  articles: [],
  view: 'LIST',
};

export const IsLoadingTable = Template.bind({});
IsLoadingTable.args = {
  isLoading: true,
  articles: [],
  view: 'TABLE',
};

export const List = Template.bind({});
List.args = {
  isLoading: false,
  articles: new Array(3).fill(0).map(() => articleMock),
  view: 'LIST',
};

export const Table = Template.bind({});
Table.args = {
  isLoading: false,
  articles: new Array(12).fill(0).map(() => articleMock),
  view: 'TABLE',
};
