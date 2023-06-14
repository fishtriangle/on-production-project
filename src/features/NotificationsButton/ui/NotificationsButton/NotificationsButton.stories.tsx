import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NotificationsButton } from './NotificationsButton';

export default {
  title: 'features/NotificationsButton',
  component: NotificationsButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NotificationsButton>;

const Template: ComponentStory<typeof NotificationsButton> = (args) => <NotificationsButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.parameters = {
  mockData: [
    {
      url: `${__API_BASE__}/notifications`,
      method: 'GET',
      status: 200,
      response: [
        {
          id: '1',
          title: 'Новое сообщение 1',
          description: 'Привет, как дела?',
          userId: '1',
          href: '',
        },
        {
          id: '2',
          title: 'Новое сообщение 2',
          description: 'Привет, как дела?',
          userId: '1',
          href: '',
        },
        {
          id: '3',
          title: 'Новое сообщение 3',
          description: 'Привет, как дела?',
          userId: '1',
          href: '',
        },
      ],
    },
  ],
};
