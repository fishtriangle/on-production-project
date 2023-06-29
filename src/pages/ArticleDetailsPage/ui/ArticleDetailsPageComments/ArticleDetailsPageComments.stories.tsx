import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { ArticleDetailsPageComments } from './ArticleDetailsPageComments';

export default {
  title: 'pages/ArticleDetailsPage/ArticleDetailsPageComments',
  component: ArticleDetailsPageComments,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleDetailsPageComments>;

const Template: ComponentStory<typeof ArticleDetailsPageComments> = (args) => (
  <ArticleDetailsPageComments {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  id: '1',
};
Primary.decorators = [
  StoreDecorator({
    articleDetailsPage: {
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
