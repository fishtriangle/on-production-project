import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Page } from './Page';

export default {
  title: 'widget/Page',
  component: Page,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => (
  <Page {...args}>
    <div>Page</div>
  </Page>
);

export const Primary = Template.bind({});
Primary.args = {};
