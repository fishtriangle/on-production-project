import { screen } from '@testing-library/react';

import { getRouteAbout, getRouteAdminPanel, getRouteProfile } from '@/shared/const/router';
import { ComponentRender } from '@/shared/lib/tests/componentRender/componentRender';

import AppRouter from './AppRouter';

describe('app/router/AppRouter', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test('Page should render correctly', async () => {
    ComponentRender(<AppRouter />, {
      route: getRouteAbout(),
    });

    const page = await screen.findByTestId('AboutPage');

    expect(page).toBeInTheDocument();
  });

  test('Unexisting path should redirect to Page 404', async () => {
    ComponentRender(<AppRouter />, {
      route: '/asdf',
    });

    const page = await screen.findByTestId('Page404');

    expect(page).toBeInTheDocument();
  });

  test('Redirect not authorized user', async () => {
    ComponentRender(<AppRouter />, {
      route: getRouteProfile('1'),
    });

    const page = await screen.findByTestId('MainPage');

    expect(page).toBeInTheDocument();
  });

  test('ProfilePage for authorized user', async () => {
    ComponentRender(<AppRouter />, {
      route: getRouteProfile('1'),
      initialState: {
        user: {
          _isInitiated: true,
          authData: {},
        },
      },
    });

    const page = await screen.findByTestId('ProfilePage');

    expect(page).toBeInTheDocument();
  });

  test('Access denied for user without permission', async () => {
    ComponentRender(<AppRouter />, {
      route: getRouteAdminPanel(),
      initialState: {
        user: {
          _isInitiated: true,
          authData: {},
        },
      },
    });

    const page = await screen.findByTestId('ForbiddenPage');

    expect(page).toBeInTheDocument();
  });

  test('Access granted for user with permission', async () => {
    ComponentRender(<AppRouter />, {
      route: getRouteAdminPanel(),
      initialState: {
        user: {
          _isInitiated: true,
          authData: { roles: ['ADMIN'] },
        },
      },
    });

    const page = await screen.findByTestId('AdminPanelPage');

    expect(page).toBeInTheDocument();
  });
});
