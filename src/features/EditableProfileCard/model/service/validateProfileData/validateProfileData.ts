import { Profile } from 'entities/Profile';
import { ValidateProfileErrors } from '../../types/EditableProfileCardSchema';

export const validateProfileData = (profile?: Profile) => {
  if (!profile) {
    return [ValidateProfileErrors.NO_DATA];
  }

  const {
    first, lastname, birthYear, country,
  } = profile;

  const errors: ValidateProfileErrors[] = [];

  if (!first) {
    errors.push(ValidateProfileErrors.INCORRECT_USER_NAME);
  }

  if (!lastname) {
    errors.push(ValidateProfileErrors.INCORRECT_LASTNAME);
  }

  if (!birthYear || !Number.isInteger(birthYear) || String(birthYear).length !== 4) {
    errors.push(ValidateProfileErrors.INCORRECT_BIRTHYEAR);
  }

  if (!country) {
    errors.push(ValidateProfileErrors.INCORRECT_COUNTRY);
  }

  return errors;
};
