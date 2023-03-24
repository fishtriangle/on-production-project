import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import AddNewComment from './AddNewComment';

export default {
  title: 'features/AddNewComment',
  component: AddNewComment,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AddNewComment>;

const Template: ComponentStory<typeof AddNewComment> = (args) => <AddNewComment {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  onSendComment: action('onSendComment'),
};
Primary.decorators = [
  StoreDecorator({}),
];
