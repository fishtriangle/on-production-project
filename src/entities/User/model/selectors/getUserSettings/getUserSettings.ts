import { buildSelector } from '@/shared/lib/store';

import { JsonSettings } from '../../types/jsonSettings';

const defaultUserSettings: JsonSettings = {};

export const [useUserSettings, getUserSettings] = buildSelector(
  (state) => state.user?.authData?.jsonSettings ?? defaultUserSettings,
);
