import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18nForTests from 'shared/config/i18n/i18nForTests';
import { IStateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { DeepPartial } from '@reduxjs/toolkit';

export interface ComponentRenderOptions {
  route?: string;
  initialState?: DeepPartial<IStateSchema>
}

export function ComponentRender(Component: ReactNode, options: ComponentRenderOptions = {}) {
  const {
    route = '/',
    initialState,
  } = options;

  return render(
    <StoreProvider initialState={initialState as IStateSchema}>
      <MemoryRouter initialEntries={[route]}>
        <I18nextProvider i18n={i18nForTests}>
          {Component}
        </I18nextProvider>
      </MemoryRouter>
    </StoreProvider>,
  );
}
