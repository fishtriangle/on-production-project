import { Currency } from 'entities/Currency/model/types/currency';
import { Country } from 'entities/Country/model/types/country';

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

export interface Profile {
  id?: string;
  first?: string;
  lastname?: string;
  birthYear?: number | '';
  currency?: Currency;
  country?: Country;
  city?: string;
  username?: string;
  avatar?: string;
}

export interface ProfileSchema {
  data?: Profile;
  form?: Profile;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
  validateErrors?: ValidateProfileErrors[];
}
