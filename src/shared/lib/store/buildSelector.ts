import { useSelector } from 'react-redux';

import { StateSchema } from '@/app/providers/StoreProvider';

type Selector<T> = (state: StateSchema) => T;
type BuildSelector<T> = [() => T, Selector<T>];

export function buildSelector<T>(selector: Selector<T>): BuildSelector<T> {
  const useSelectorHook = () => useSelector(selector);

  return [useSelectorHook, selector];
}
