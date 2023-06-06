import { Story } from '@storybook/react';
// TODO
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
// eslint-disable-next-line fish-triangle-eslint-plugin/public-api-imports
import { loginReducer } from '@/features/AuthByUsername/model/slice/loginSlice';
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
// eslint-disable-next-line fish-triangle-eslint-plugin/public-api-imports
import { articleDetailsReducer } from '@/entities/Article/model/slice/articleDetailsSlice';
// eslint-disable-next-line fish-triangle-eslint-plugin/public-api-imports
import { addNewCommentReducer } from '@/features/AddNewComment/model/slice/addNewCommentSlice';
// eslint-disable-next-line fish-triangle-eslint-plugin/public-api-imports
import { articlesPageReducer } from '@/pages/ArticlesPage/model/slices/articlesPageSlice';
import { pageReducer } from '@/widgets/Page';
// eslint-disable-next-line fish-triangle-eslint-plugin/public-api-imports
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/model/slices';
// eslint-disable-next-line fish-triangle-eslint-plugin/public-api-imports
import { profileReducer } from '@/features/EditableProfileCard/model/slice/profileSlice';

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addNewComment: addNewCommentReducer,
  articleDetailsPage: articleDetailsPageReducer,
  articlesPage: articlesPageReducer,
  page: pageReducer,
};

export const StoreDecorator = (
  state: DeepPartial<StateSchema>,
  asyncReducers?: ReducersList,
) => (Story: Story) => (
  <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
    <Story />
  </StoreProvider>
);
