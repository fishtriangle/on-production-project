import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleListItem } from './ArticleListItem';
import { articleMock } from '../../test/articleMock';

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
