import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import '@/shared/config/i18n/i18n';
import '@/app/styles/index.scss';
import { ForceUpdateProvider } from '@/shared/lib/render/forceUpdate';

import App from './app/App';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(container);

if (__PROJECT__ !== 'storybook') {
  root.render(
    <BrowserRouter>
      <StoreProvider>
        <ErrorBoundary>
          <ForceUpdateProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </ForceUpdateProvider>
        </ErrorBoundary>
      </StoreProvider>
    </BrowserRouter>,
  );
} else {
  root.render(<div />);
}

export { Theme } from '@/shared/const/theme';
