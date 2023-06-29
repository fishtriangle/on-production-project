import type {
  StateSchema,
  StoreWithReducerManager,
  ThunkConfig,
  StateSchemaKey,
} from './config/StateSchema';
import { createReduxStore } from './config/store';
import type { AppDispatch } from './config/store';
import { StoreProvider } from './ui/StoreProvider';

export { StoreProvider, createReduxStore };

export type {
  StateSchemaKey,
  StateSchema,
  StoreWithReducerManager,
  AppDispatch,
  ThunkConfig,
};
