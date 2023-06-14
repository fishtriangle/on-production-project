import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProfileRating from './ProfileRating';

export default {
  title: 'features/ProfileRating',
  component: ProfileRating,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileRating>;

const Template: ComponentStory<typeof ProfileRating> = (args) => <ProfileRating {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  profileId: '1',
};
Primary.parameters = {
  mockData: [
    {
      url: `${__API_BASE__}/profile-ratings?userId=1&profileId=1`,
      method: 'GET',
      status: 200,
      response: [
        {
          id: '1',
          rate: 4,
          feedback: 'Good profile',
          userId: '1',
          profileId: '1',
        },
      ],
    },
    {
      url: `${__API_BASE__}/profile-ratings`,
      method: 'POST',
      status: 200,
      response: undefined,
    },
  ],
};
