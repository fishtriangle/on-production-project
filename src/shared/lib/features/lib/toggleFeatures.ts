import { FeatureFlags } from '@/shared/types/featureFlags';

import { getFeatureFlags } from './setGetFeatures';

interface ToggleFeaturesOptions<T> {
  name: keyof FeatureFlags;
  on: () => T;
  off: () => T;
}

export function toggleFeatures<T>(options: ToggleFeaturesOptions<T>): T {
  const { name, on, off } = options;
  if (getFeatureFlags(name)) {
    return on();
  }
  return off();
}
