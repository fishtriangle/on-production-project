import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18nForTests from 'shared/config/i18n/i18nForTests';

export interface ComponentRenderOptions {
  route?: string;
}

export function ComponentRender(Component: ReactNode, options: ComponentRenderOptions = {}) {
  const {
    route = '/',
  } = options;

  return render(
    <MemoryRouter initialEntries={[route]}>
      <I18nextProvider i18n={i18nForTests}>
        {Component}
      </I18nextProvider>
    </MemoryRouter>,
  );
}