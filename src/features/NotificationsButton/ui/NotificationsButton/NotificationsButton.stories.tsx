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
