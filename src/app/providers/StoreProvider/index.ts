import { StoreProvider } from './ui/StoreProvider';
import { createReduxStore } from './config/store';
import type { AppDispatch } from './config/store';
import type {
  StateSchema, StoreWithReducerManager, ThunkConfig, StateSchemaKey,
} from './config/StateSchema';

export {
  StoreProvider,
  createReduxStore,
};

export type {
  StateSchemaKey,
  StateSchema,
  StoreWithReducerManager,
  AppDispatch,
  ThunkConfig,
};
