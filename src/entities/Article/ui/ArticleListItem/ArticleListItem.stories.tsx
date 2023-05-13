import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { articleMock } from '@/shared/lib/mock/mock';
import { ArticleListItem } from './ArticleListItem';

export default {
  title: 'entities/Article/ArticleListItem',
  component: ArticleListItem,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleListItem>;

const Template: ComponentStory<typeof ArticleListItem> = (args) => <ArticleListItem {...args} />;

export const List = Template.bind({});
List.args = {
  view: 'LIST',
  article: articleMock,
};

export const Table = Template.bind({});
Table.args = {
  view: 'TABLE',
  article: articleMock,
};
