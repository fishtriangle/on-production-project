import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FeatureFlags } from '@/shared/types/featureFlags';

import { updateFeatureFlagsMutation } from '../api/featureFlagsApi';
import { getAllFeatureFlags, setFeatureFlags } from '../lib/setGetFeatures';

interface UpdateFeatureFlagsOptions {
  userId: string;
  features: Partial<FeatureFlags>;
}

export const updateFeatureFlags = createAsyncThunk<
  void,
  UpdateFeatureFlagsOptions,
  ThunkConfig<string>
>('user/saveJsonSettings', async ({ userId, features }, thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI;

  const featureFlags = {
    ...getAllFeatureFlags(),
    ...features,
  };

  try {
    await dispatch(
      updateFeatureFlagsMutation({
        userId,
        features: featureFlags,
      }),
    );

    setFeatureFlags(featureFlags);

    return undefined;
  } catch (error) {
    return rejectWithValue(String(error));
  }
});
