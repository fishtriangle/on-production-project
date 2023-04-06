import { StateSchema } from 'app/providers/StoreProvider';

export const getArticlePageError = (state: StateSchema) => state.articlesPage?.error || false;
export const getArticlePageIsLoading = (state: StateSchema) => state.articlesPage?.isLoading;
export const getArticlePageView = (state: StateSchema) => state.articlesPage?.view || 'TABLE';
export const getArticlePageNum = (state: StateSchema) => state.articlesPage?.page || 1;
export const getArticlePageLimit = (state: StateSchema) => state.articlesPage?.limit || 9;
export const getArticlePageHasMore = (state: StateSchema) => state.articlesPage?.hasMore;
