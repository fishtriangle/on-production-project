export type UserRoles = 'ADMIN' | 'USER' | 'MANAGER';

export interface User {
  id: string;
  username: string;
  avatar?: string;
  roles?: UserRoles[];
}

export interface UserSchema {
  authData?: User;

  _isInitiated: boolean;
}
