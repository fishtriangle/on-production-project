import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import { addNewCommentReducer } from 'features/AddNewComment/model/slice/addNewCommentSlice';
import { articlesPageReducer } from 'pages/ArticlesPage/model/slices/articlesPageSlice';
import { pageReducer } from 'widgets/Page';
import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage/model/slices';
import { profileReducer } from 'features/EditableProfileCard/model/slice/profileSlice';

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
