export enum LoginErrors {
  INCORRECT_DATA = 'ErrorInvalidNameOrPassword!',
  SERVER_ERROR = 'ErrorLoadUserDataError!',
  UNKNOWN_ERROR = 'ErrorUnknownError!',
}

export interface LoginSchema {
  username: string;
  password: string;
  isLoading: boolean;
  error?: LoginErrors;
}
