import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CommentList } from './CommentList';

export default {
  title: 'entities/Comment/CommentList',
  component: CommentList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  comments: [
    {
      id: '1',
      user: {
        id: '1',
        username: 'User 1',
        avatar: 'https://sun6-23.userapi.com/s/v1/if1/OOhoHn_7BlxRjBnKROjlQG9OFgTbqOiMnVxSlD1M_J4kAPHPlTJqqiLmt_D65plnOmQZn1Q7.jpg?size=1080x1080&quality=96&crop=0,0,1080,1080&ava=1',
      },
      text: 'Check 1',
    },
    {
      id: '2',
      user: {
        id: '1',
        username: 'User 1',
        avatar: 'https://sun6-23.userapi.com/s/v1/if1/OOhoHn_7BlxRjBnKROjlQG9OFgTbqOiMnVxSlD1M_J4kAPHPlTJqqiLmt_D65plnOmQZn1Q7.jpg?size=1080x1080&quality=96&crop=0,0,1080,1080&ava=1',
      },
      text: 'Check 2',
    },
    {
      id: '3',
      user: {
        id: '2',
        username: 'User 2',
        avatar: 'https://sun6-23.userapi.com/s/v1/if1/OOhoHn_7BlxRjBnKROjlQG9OFgTbqOiMnVxSlD1M_J4kAPHPlTJqqiLmt_D65plnOmQZn1Q7.jpg?size=1080x1080&quality=96&crop=0,0,1080,1080&ava=1',
      },
      text: 'Check 3',
    },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  comments: [],
  isLoading: true,
};
