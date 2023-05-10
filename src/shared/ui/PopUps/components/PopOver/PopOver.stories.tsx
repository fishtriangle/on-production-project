import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PopOver } from './PopOver';

export default {
  title: 'shared/PopUps/PopOver',
  component: PopOver,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof PopOver>;

const Template: ComponentStory<typeof PopOver> = (args) => <PopOver {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'PopOver',
};
