import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleType } from 'entities/Article';

export const getArticlesPageError = (state: StateSchema) => state.articlesPage?.error || false;
export const getArticlesPageIsLoading = (state: StateSchema) => state.articlesPage?.isLoading;
export const getArticlesPageView = (state: StateSchema) => state.articlesPage?.view || 'TABLE';
export const getArticlesPageNum = (state: StateSchema) => state.articlesPage?.page || 1;
export const getArticlesPageLimit = (state: StateSchema) => state.articlesPage?.limit || 9;
export const getArticlesPageHasMore = (state: StateSchema) => state.articlesPage?.hasMore;
export const getArticlesPageIsInitiated = (state: StateSchema) => state.articlesPage?._isInitiated || false;
export const getArticlesPageSort = (state: StateSchema) => state.articlesPage?.sort ?? 'createdAt';
export const getArticlesPageSearch = (state: StateSchema) => state.articlesPage?.search ?? '';
export const getArticlesPageOrder = (state: StateSchema) => state.articlesPage?.order ?? 'asc';
export const getArticlesPageType = (state: StateSchema) => state.articlesPage?.type ?? ArticleType.ALL;
