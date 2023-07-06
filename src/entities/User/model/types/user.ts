import { FeatureFlags } from '@/shared/types/featureFlags';

import { JsonSettings } from './jsonSettings';

export type UserRoles = 'ADMIN' | 'USER' | 'MANAGER';

export interface User {
  id: string;
  username: string;
  avatar?: string;
  roles?: UserRoles[];
  features?: FeatureFlags;
  jsonSettings?: JsonSettings;
}

export interface UserSchema {
  authData?: User;

  _isInitiated: boolean;
}
