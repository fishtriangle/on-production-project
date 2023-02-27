import { Story } from '@storybook/react';
import { IStateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { DeepPartial } from '@reduxjs/toolkit';

export const StoreDecorator = (state: DeepPartial<IStateSchema>) => (Story: Story) => (
  <StoreProvider initialState={state}>
    <Story />
  </StoreProvider>
);
