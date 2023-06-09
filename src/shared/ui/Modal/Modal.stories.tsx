import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Modal } from './Modal';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'shared/Modal',
  component: Modal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, atque consequatur corporis culpa debitis dolor eaque enim eveniet id ipsa officia omnis quasi qui repudiandae sapiente sequi temporibus voluptatem voluptatibus.',
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  isOpen: true,
  children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, atque consequatur corporis culpa debitis dolor eaque enim eveniet id ipsa officia omnis quasi qui repudiandae sapiente sequi temporibus voluptatem voluptatibus.',
};
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];
