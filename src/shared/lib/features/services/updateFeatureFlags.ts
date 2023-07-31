import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FeatureFlags } from '@/shared/types/featureFlags';

import { updateFeatureFlagsMutation } from '../api/featureFlagsApi';
import { getAllFeatureFlags } from '../lib/setGetFeatures';

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

  try {
    await dispatch(
      updateFeatureFlagsMutation({
        userId,
        features: {
          ...getAllFeatureFlags(),
          ...features,
        },
      }),
    );

    window.location.reload();
  } catch (error) {
    rejectWithValue(String(error));
  }
});
