import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { ProfileCardProps } from '../ProfileCard/ProfileCard';

export const ProfileCardRedesignedSkeleton = () => (
  <Card paddings="24" maxWidth>
    <VStack gap="32">
      <HStack maxWidth justify="center">
        <Skeleton border="100%" width={128} height={128} />
      </HStack>
      <HStack gap="32" maxWidth>
        <VStack gap="16" maxWidth>
          <Skeleton width="100%" height={38} />
          <Skeleton width="100%" height={38} />
          <Skeleton width="100%" height={38} />
          <Skeleton width="100%" height={38} />
        </VStack>
        <VStack gap="16" maxWidth>
          <Skeleton width="100%" height={38} />
          <Skeleton width="100%" height={38} />
          <Skeleton width="100%" height={38} />
          <Skeleton width="100%" height={38} />
        </VStack>
      </HStack>
    </VStack>
  </Card>
);

export const ProfileCardRedesignedError = () => {
  const { t } = useTranslation('profile');

  return (
    <HStack justify="center" maxWidth>
      <Text
        title={t('Profile loading error!')}
        text={t('Try to reload page')}
        variant="error"
        align="center"
      />
    </HStack>
  );
};

export const ProfileCardRedesigned = memo((props: ProfileCardProps) => {
  const {
    className,
    data,
    onChangeFirstname,
    onChangeLastname,
    onChangeBirthyear,
    onChangeCity,
    onChangeAvatar,
    onChangeUsername,
    onChangeCountry,
    onChangeCurrency,
    readonly,
  } = props;

  const { t } = useTranslation('profile');

  return (
    <Card paddings="24" maxWidth className={className}>
      <VStack gap="32">
        {data?.avatar && (
          <HStack justify="center" maxWidth>
            <Avatar src={data?.avatar} alt={data?.username} size={128} />
          </HStack>
        )}
        <HStack gap="24" maxWidth>
          <VStack gap="16" maxWidth>
            <Input
              value={data?.first}
              label={t('Name') ?? ''}
              onChange={onChangeFirstname}
              readonly={readonly}
              autofocus={!readonly}
              data-testid="ProfileCard.firstname"
            />
            <Input
              value={data?.lastname}
              label={t('Lastname') ?? ''}
              onChange={onChangeLastname}
              readonly={readonly}
              data-testid="ProfileCard.lastname"
            />
            <Input
              value={data?.birthYear}
              label={t('Birth year') ?? ''}
              onChange={onChangeBirthyear}
              readonly={readonly}
            />
            <Input
              value={data?.city}
              label={t('City') ?? ''}
              onChange={onChangeCity}
              readonly={readonly}
            />
          </VStack>
          <VStack gap="16" maxWidth>
            <Input
              value={data?.username}
              label={t('Username') ?? ''}
              onChange={onChangeUsername}
              readonly={readonly}
            />
            <Input
              value={data?.avatar}
              label={t('Avatar') ?? ''}
              onChange={onChangeAvatar}
              readonly={readonly}
            />
            <CurrencySelect
              value={data?.currency}
              onChange={onChangeCurrency}
              readonly={readonly}
            />
            <CountrySelect
              value={data?.country}
              onChange={onChangeCountry}
              readonly={readonly}
            />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
});
