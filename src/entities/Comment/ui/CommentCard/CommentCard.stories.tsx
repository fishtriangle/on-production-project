import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CommentCard } from './CommentCard';

export default {
  title: 'entities/Comment/CommentCard',
  component: CommentCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  comment: {
    id: '1',
    user: {
      id: '1',
      username: 'User 1',
      avatar: 'https://sun6-23.userapi.com/s/v1/if1/OOhoHn_7BlxRjBnKROjlQG9OFgTbqOiMnVxSlD1M_J4kAPHPlTJqqiLmt_D65plnOmQZn1Q7.jpg?size=1080x1080&quality=96&crop=0,0,1080,1080&ava=1',
    },
    text: 'Check 1',
  },
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
