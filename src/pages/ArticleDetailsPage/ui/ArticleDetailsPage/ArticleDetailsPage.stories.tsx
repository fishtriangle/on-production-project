import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Article } from '@/entities/Article';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { articleMock } from '@/shared/lib/mock/mock';
import ArticleDetailsPage from './ArticleDetailsPage';

const article: Article = articleMock;

export default {
  title: 'pages/ArticleDetailsPage/ArticleDetailsPage',
  component: ArticleDetailsPage,
  parameters: {
    router: {
      path: '/articles/:id',
      route: '/articles/1',
    },
  },
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleDetailsPage>;

const Template: ComponentStory<typeof ArticleDetailsPage> = (args) => <ArticleDetailsPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [
  StoreDecorator({
    articleDetails: {
      data: article,
    },
    articleDetailsPage: {
      recommendations: {
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
      },
      comments: {
        isLoading: false,
        error: undefined,
        ids: ['1'],
        entities: {
          1: {
            id: '1',
            user: { id: '1', username: 'User 1' },
            text: 'Comment 1',
          },
        },
      },
    },
  }),
];
