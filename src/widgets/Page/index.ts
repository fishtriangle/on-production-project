export { Page } from './ui/Page/Page';

export type { PageSchema } from './model/types/PageSchema';

export { pageActions, pageReducer } from './model/slices/pageSlice';

export { getPageScroll, getPageScrollByPath } from './model/selectors/pageSelectors';
