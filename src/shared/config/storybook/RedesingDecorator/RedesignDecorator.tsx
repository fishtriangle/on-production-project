// eslint-disable-next-line fish-triangle-eslint-plugin/layer-imports
import '@/app/styles/index.scss';
import { Story } from '@storybook/react';

// eslint-disable-next-line fish-triangle-eslint-plugin/layer-imports
import { setFeatureFlags } from '@/shared/lib/features';
import { getAllFeatureFlags } from '@/shared/lib/features/lib/setGetFeatures';

export const RedesignDecorator = (Story: Story) => {
  setFeatureFlags({ ...getAllFeatureFlags(), isSiteRedesigned: true });
  return (
    <div className="app_redesigned">
      <Story />
    </div>
  );
};
