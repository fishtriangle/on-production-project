export enum LoginErrors {
  INCORRECT_DATA = 'ErrorInvalidNameOrPassword!',
  SERVER_ERROR = 'ErrorLoadUserDataError!',
}

export interface LoginSchema {
  username: string;
  password: string;
  isLoading: boolean;
  error?: LoginErrors;
}
