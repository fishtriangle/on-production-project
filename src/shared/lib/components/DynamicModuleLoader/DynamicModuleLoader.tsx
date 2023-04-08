import { FC, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { StoreWithReducerManager } from 'app/providers/StoreProvider';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { Reducer } from '@reduxjs/toolkit';

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer;
}

interface DynamicModuleLoaderProps {
  reducers: ReducersList;
  removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
  const {
    children, reducers, removeAfterUnmount = true,
  } = props;

  const dispatch = useDispatch();

  const store = useStore() as StoreWithReducerManager;

  useEffect(() => {
    const mountedReducers = store.reducerManager.getReducerMap();

    Object.entries(reducers).forEach(([name, reducer]) => {
      const isMounted = mountedReducers[name as StateSchemaKey] !== undefined;

      if (!isMounted) {
        store.reducerManager.add(name as StateSchemaKey, reducer);

        dispatch({ type: `@INIT ${name} reducer` });
      }
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name]) => {
          store.reducerManager.remove(name as StateSchemaKey);
          dispatch({ type: `@DELETE ${name} reducer` });
        });
      }
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      { children }
    </>
  );
};
