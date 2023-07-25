import type { Country } from '@/entities/Country';
import type { Currency } from '@/entities/Currency';
import { ToggleFeatures } from '@/shared/lib/features';

import { Profile } from '../../model/types/profile';
import {
  ProfileCardDeprecated,
  ProfileCardDeprecatedError,
  ProfileCardDeprecatedSkeleton,
} from '../ProfileCardDeprecated/ProfileCardDeprecated';
import {
  ProfileCardRedesigned,
  ProfileCardRedesignedError,
  ProfileCardRedesignedSkeleton,
} from '../ProfileCardRedesigned/ProfileCardRedesigned';

export interface ProfileCardProps {
  className?: string;
  data?: Profile;
  isLoading?: boolean;
  error?: string;
  readonly?: boolean;
  onChangeFirstname?: (value?: string) => void;
  onChangeLastname?: (value?: string) => void;
  onChangeBirthyear?: (value?: string) => void;
  onChangeCity?: (value?: string) => void;
  onChangeAvatar?: (value?: string) => void;
  onChangeUsername?: (value?: string) => void;
  onChangeCurrency?: (currency: Currency) => void;
  onChangeCountry?: (country: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const { data, isLoading, error } = props;

  if (isLoading) {
    return (
      <ToggleFeatures
        featureName="isSiteRedesigned"
        on={<ProfileCardRedesignedSkeleton />}
        off={<ProfileCardDeprecatedSkeleton />}
      />
    );
  }

  if (error) {
    return (
      <ToggleFeatures
        featureName="isSiteRedesigned"
        on={<ProfileCardRedesignedError />}
        off={<ProfileCardDeprecatedError />}
      />
    );
  }

  if (data) {
    return (
      <ToggleFeatures
        featureName="isSiteRedesigned"
        on={<ProfileCardRedesigned {...props} />}
        off={<ProfileCardDeprecated {...props} />}
      />
    );
  }

  return null;
};
