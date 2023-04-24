module.exports = (component) => (`import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ${component} } from './${component}';

export default {
  title: 'component/${component}',
  component: ${component},
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ${component}>;

const Template: ComponentStory<typeof ${component}> = (args) => <${component} {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

`);
