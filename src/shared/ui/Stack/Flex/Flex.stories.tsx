import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Flex } from './Flex';

export default {
  title: 'shared/Stack/Flex',
  component: Flex,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />;

export const Row = Template.bind({});
Row.args = {
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  ),
};

export const RowGap4 = Template.bind({});
RowGap4.args = {
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  ),
  gap: '4',
};

export const RowGap8 = Template.bind({});
RowGap8.args = {
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  ),
  gap: '8',
};

export const RowGap16 = Template.bind({});
RowGap16.args = {
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  ),
  gap: '16',
};

export const RowGap32 = Template.bind({});
RowGap32.args = {
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  ),
  gap: '32',
};

export const Column = Template.bind({});
Column.args = {
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  ),
  direction: 'column',
};

export const ColumnGap4 = Template.bind({});
ColumnGap4.args = {
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  ),
  gap: '4',
  direction: 'column',
};

export const ColumnGap8 = Template.bind({});
ColumnGap8.args = {
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  ),
  gap: '8',
  direction: 'column',
};

export const ColumnGap16 = Template.bind({});
ColumnGap16.args = {
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  ),
  gap: '16',
  direction: 'column',
};

export const ColumnGap32 = Template.bind({});
ColumnGap32.args = {
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  ),
  gap: '32',
  direction: 'column',
};

export const ColumnAlingCenter = Template.bind({});
ColumnAlingCenter.args = {
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  ),
  direction: 'column',
  align: 'center',
};

export const ColumnAlingEnd = Template.bind({});
ColumnAlingEnd.args = {
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
      <div>fourth</div>
    </>
  ),
  direction: 'column',
  align: 'end',
};
