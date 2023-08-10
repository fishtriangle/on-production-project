import { LOCAL_STORAGE_LAST_DESIGN_KEY } from '@/shared/const/localStorage';
import { FeatureFlags } from '@/shared/types/featureFlags';

const defaultFeatureFlags: FeatureFlags = {
  isSiteRedesigned:
    localStorage.getItem(LOCAL_STORAGE_LAST_DESIGN_KEY) === 'new',
};

let featureFlags: FeatureFlags = {
  ...defaultFeatureFlags,
};

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

export const getAllFeatureFlags = () => {
  if (!featureFlags) {
    return false;
  }

  return featureFlags;
};
