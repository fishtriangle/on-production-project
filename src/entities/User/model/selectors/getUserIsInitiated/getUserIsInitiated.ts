import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserIsInitiated = (state: StateSchema) =>
  state.user._isInitiated;
