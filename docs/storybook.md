## Storybook
For most ui components there are Storybook cases(stories).
Server requests are mocked with *storybook-addon-mock*.
Story files(.stories.tsx) are located same folder with ui tsx file.
- `npm run storybook` - launch storybook

About [Storybook](/docs/storybook.md).

Example of story:
```typescript jsx
import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CountrySelect } from './CountrySelect';

export default {
  title: 'entities/CountrySelect',
  component: CountrySelect,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
    children: 'CurrencySelect',
  },
} as ComponentMeta<typeof CountrySelect>;

const Template: ComponentStory<typeof CountrySelect> = (args) => <CountrySelect {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
```
