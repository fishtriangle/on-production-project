import { Story } from '@storybook/react';
import { Suspense } from 'react';
// eslint-disable-next-line fish-triangle-eslint-plugin/layer-imports
import { PageLoader } from '@/widgets/PageLoader';

export const SuspenseDecorator = (Story: Story) => (
  <Suspense fallback={<PageLoader />}>
    <Story />
  </Suspense>
);
