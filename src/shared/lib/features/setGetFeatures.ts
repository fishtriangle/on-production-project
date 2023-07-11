import { FeatureFlags } from '@/shared/types/featureFlags';

let featureFlags: FeatureFlags;

export const setFeatureFlags = (newFeatureFlags?: FeatureFlags) => {
  if (newFeatureFlags) {
    featureFlags = newFeatureFlags;
  }
};

export const getFeatureFlags = (flag: keyof FeatureFlags) => {
  if (!featureFlags) {
    return false;
  }

  return featureFlags[flag];
};
