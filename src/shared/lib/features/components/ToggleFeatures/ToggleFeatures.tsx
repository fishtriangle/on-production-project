import { ReactElement } from 'react';

import { FeatureFlags } from '@/shared/types/featureFlags';

import { getFeatureFlags } from '../../lib/setGetFeatures';

interface ToggleFeaturesProps {
  featureName: keyof FeatureFlags;
  on: ReactElement;
  off: ReactElement;
}

export const ToggleFeatures = (props: ToggleFeaturesProps) => {
  const { featureName, on, off } = props;

  if (getFeatureFlags(featureName)) {
    return on;
  }

  return off;
};
