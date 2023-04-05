import { StateSchema } from 'app/providers/StoreProvider';

export const getArticlePageError = (state: StateSchema) => state.articlesPage?.error || false;
export const getArticlePageIsLoading = (state: StateSchema) => state.articlesPage?.isLoading;
export const getArticlePageView = (state: StateSchema) => state.articlesPage?.view || 'TABLE';
