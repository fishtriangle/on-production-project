import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleRecommendationsList } from './ArticleRecommendationsList';

export default {
  title: 'features/ArticleRecomendationsList',
  component: ArticleRecommendationsList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) => <ArticleRecommendationsList {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
