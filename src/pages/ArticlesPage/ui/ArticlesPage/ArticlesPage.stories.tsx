import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { articleMock } from '@/entities/Article/testing';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import ArticlesPage from './ArticlesPage';

export default {
  title: 'pages/ArticlesPage/ArticlesPage',
  component: ArticlesPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticlesPage>;

const Template: ComponentStory<typeof ArticlesPage> = (args) => <ArticlesPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [
  StoreDecorator({
    articlesPage: {
      isLoading: false,
      view: 'LIST',
      ids: ['1', '2'],
      entities: {
        1: articleMock,
        2: articleMock,
      },
    },
  }),
];
