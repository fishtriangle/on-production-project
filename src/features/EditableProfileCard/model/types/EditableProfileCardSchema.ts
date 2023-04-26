import { Profile } from 'entities/Profile';

export enum ValidateProfileErrors {
  INCORRECT_USER_NAME = 'Incorrect user name',
  INCORRECT_LASTNAME = 'Incorrect lastname',
  INCORRECT_BIRTHYEAR = 'Incorrect birthyear',
  INCORRECT_COUNTRY = 'Incorrect country',
  INCORRECT_DATA = 'Incorrect data',
  SERVER_ERROR = 'Server error',
  NO_DATA = 'No data to validate',
  UNKNOWN_ERROR = 'Unknown error',
}

export interface ProfileSchema {
  data?: Profile;
  form?: Profile;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
  validateErrors?: ValidateProfileErrors[];
}
