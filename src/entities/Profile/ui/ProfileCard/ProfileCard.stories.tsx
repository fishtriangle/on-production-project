import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import { ProfileCard } from './ProfileCard';

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  data: {
    username: 'admin',
    birthYear: 1988,
    country: Country.RU,
    lastname: 'Brown',
    first: 'James',
    city: 'Moscow',
    currency: Currency.RUB,
  },
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  data: {
    username: 'admin',
    birthYear: 1988,
    country: Country.RU,
    lastname: 'Brown',
    first: 'James',
    city: 'Moscow',
    currency: Currency.RUB,
  },
};
PrimaryDark.decorators = [
  ThemeDecorator(Theme.DARK),
];

export const WithError = Template.bind({});
WithError.args = {
  error: 'error',
};

export const WithErrorDark = Template.bind({});
WithErrorDark.args = {
  error: 'error',
};
WithErrorDark.decorators = [
  ThemeDecorator(Theme.DARK),
];

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};

export const LoadingDark = Template.bind({});
LoadingDark.args = {
  isLoading: true,
};
LoadingDark.decorators = [
  ThemeDecorator(Theme.DARK),
];
