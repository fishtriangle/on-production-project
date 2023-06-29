import {
  AnyAction,
  CombinedState,
  Dispatch,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { ArticleDetailsSchema } from '@/entities/Article';
import { ICounterSchema } from '@/entities/Counter';
import { UserSchema } from '@/entities/User';
import { AddNewCommentSchema } from '@/features/AddNewComment';
import { LoginSchema } from '@/features/AuthByUsername';
import { ProfileSchema } from '@/features/EditableProfileCard';
import { ArticleDetailsPageSchema } from '@/pages/ArticleDetailsPage';
import { ArticlesPageSchema } from '@/pages/ArticlesPage';
import { rtkApi } from '@/shared/api/rtkApi';
import { PageSchema } from '@/widgets/Page';

export interface StateSchema {
  counter: ICounterSchema;
  user: UserSchema;
  page: PageSchema;
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

  loginForm?: LoginSchema;
  profile?: ProfileSchema;
  articleDetails?: ArticleDetailsSchema;
  addNewComment?: AddNewCommentSchema;
  articlesPage?: ArticlesPageSchema;

  articleDetailsPage?: ArticleDetailsPageSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

export interface StoreWithReducerManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ThunkExtraArguments {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArguments;
  dispatch?: Dispatch;
  state: StateSchema;
}
