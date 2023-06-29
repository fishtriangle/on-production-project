import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticlePageRecommendationsError = (state: StateSchema) =>
  state.articleDetailsPage?.recommendations.error;
export const getArticlePageRecommendationsIsLoading = (state: StateSchema) =>
  state.articleDetailsPage?.recommendations.isLoading;
