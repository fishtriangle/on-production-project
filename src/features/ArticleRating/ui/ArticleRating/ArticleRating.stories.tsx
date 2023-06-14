import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import ArticleRating from './ArticleRating';

export default {
  title: 'features/ArticleRating',
  component: ArticleRating,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleRating>;

const Template: ComponentStory<typeof ArticleRating> = (args) => <ArticleRating {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  articleId: '1',
};
Primary.parameters = {
  mockData: [
    {
      url: `${__API_BASE__}/article-ratings?userId=1&articleId=1`,
      method: 'GET',
      status: 200,
      response: [
        {
          id: '1',
          rate: 4,
          feedback: 'Good article',
          userId: '1',
          articleId: '1',
        },
      ],
    },
    {
      url: `${__API_BASE__}/article-ratings`,
      method: 'POST',
      status: 200,
      response: undefined,
    },
  ],
};

export const WithoutRate = Template.bind({});
WithoutRate.args = {
  articleId: '1',
};
WithoutRate.parameters = {
  mockData: [
    {
      url: `${__API_BASE__}/article-ratings?userId=1&articleId=1`,
      method: 'GET',
      status: 200,
      response: [],
    },
    {
      url: `${__API_BASE__}/article-ratings`,
      method: 'POST',
      status: 200,
      response: undefined,
    },
  ],
};
