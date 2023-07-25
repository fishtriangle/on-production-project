import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Avatar as AvatarDeprecated } from '@/shared/ui/depricated/Avatar';
import { Input as InputDeprecated } from '@/shared/ui/depricated/Input';
import { Loader } from '@/shared/ui/depricated/Loader';
import {
  Text as TextDeprecated,
  TextAlign,
  TextTheme,
} from '@/shared/ui/depricated/Text';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

import classes from './ProfileCardDeprecated.module.scss';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';

export const ProfileCardDeprecatedError = () => {
  const { t } = useTranslation('profile');

  return (
    <HStack
      justify="center"
      maxWidth
      className={classNames(classes.ProfileCard, {}, [classes.error])}
    >
      <TextDeprecated
        title={t('Profile loading error!')}
        text={t('Try to reload page')}
        theme={TextTheme.ERROR}
        align={TextAlign.CENTER}
      />
    </HStack>
  );
};

export const ProfileCardDeprecatedSkeleton = () => (
  <HStack
    justify="center"
    maxWidth
    className={classNames(classes.ProfileCard, {}, [classes.loading])}
  >
    <Loader />
  </HStack>
);

export const ProfileCardDeprecated = memo((props: ProfileCardProps) => {
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

  const mods: Mods = {
    [classes.editing]: !readonly,
  };

  return (
    <VStack
      gap="16"
      maxWidth
      className={classNames(classes.ProfileCard, mods, [className])}
    >
      {data?.avatar && (
        <HStack justify="center" maxWidth className={classes.avatarWrapper}>
          <AvatarDeprecated
            src={data?.avatar}
            alt={data?.username}
            size={120}
          />
        </HStack>
      )}
      <InputDeprecated
        value={data?.first}
        placeholder={t('Your name') ?? ''}
        className={classes.input}
        onChange={onChangeFirstname}
        readonly={readonly}
        autofocus={!readonly}
        data-testid="ProfileCard.firstname"
      />
      <InputDeprecated
        value={data?.lastname}
        placeholder={t('Your lastname') ?? ''}
        className={classes.input}
        onChange={onChangeLastname}
        readonly={readonly}
        data-testid="ProfileCard.lastname"
      />
      <InputDeprecated
        value={data?.birthYear}
        placeholder={t('Your birth year') ?? ''}
        className={classes.input}
        onChange={onChangeBirthyear}
        readonly={readonly}
      />
      <InputDeprecated
        value={data?.city}
        placeholder={t('Your city') ?? ''}
        className={classes.input}
        onChange={onChangeCity}
        readonly={readonly}
      />
      <InputDeprecated
        value={data?.username}
        placeholder={t('Your username') ?? ''}
        className={classes.input}
        onChange={onChangeUsername}
        readonly={readonly}
      />
      <InputDeprecated
        value={data?.avatar}
        placeholder={t('Link to your avatar image') ?? ''}
        className={classes.input}
        onChange={onChangeAvatar}
        readonly={readonly}
      />
      <CurrencySelect
        value={data?.currency}
        onChange={onChangeCurrency}
        readonly={readonly}
        className={classes.input}
      />
      <CountrySelect
        value={data?.country}
        onChange={onChangeCountry}
        readonly={readonly}
        className={classes.input}
      />
    </VStack>
  );
});
