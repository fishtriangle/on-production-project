import { useTranslation } from 'react-i18next';

import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Currency } from 'entities/Currency/model/types/currency';
import { CurrencySelect } from 'entities/Currency';

import { Country } from 'entities/Country/model/types/country';
import { CountrySelect } from 'entities/Country';
import { HStack, VStack } from 'shared/ui/Stack';
import classes from './ProfileCard.module.scss';
import { Profile } from '../../model/types/profile';

interface ProfileCardProps {
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
  const {
    className,
    data,
    isLoading,
    error,
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

  if (isLoading) {
    return (
      <HStack justify="center" maxWidth className={classNames(classes.ProfileCard, {}, [className, classes.loading])}>
        <Loader />
      </HStack>
    );
  }

  if (error) {
    return (
      <HStack justify="center" maxWidth className={classNames(classes.ProfileCard, {}, [className, classes.error])}>
        <Text
          title={t('Profile loading error!')}
          text={t('Try to reload page')}
          theme={TextTheme.ERROR}
          align={TextAlign.CENTER}
        />
      </HStack>
    );
  }

  return (
    <VStack gap="16" maxWidth className={classNames(classes.ProfileCard, mods, [className])}>
      {data?.avatar && (
        <HStack justify="center" maxWidth className={classes.avatarWrapper}>
          <Avatar
            src={data?.avatar}
            alt={data?.username}
            size={120}
          />
        </HStack>
      )}
      <Input
        value={data?.first}
        placeholder={t('Your name')}
        className={classes.input}
        onChange={onChangeFirstname}
        readonly={readonly}
        autofocus={!readonly}
      />
      <Input
        value={data?.lastname}
        placeholder={t('Your lastname')}
        className={classes.input}
        onChange={onChangeLastname}
        readonly={readonly}
      />
      <Input
        value={data?.birthYear}
        placeholder={t('Your birth year')}
        className={classes.input}
        onChange={onChangeBirthyear}
        readonly={readonly}
      />
      <Input
        value={data?.city}
        placeholder={t('Your city')}
        className={classes.input}
        onChange={onChangeCity}
        readonly={readonly}
      />
      <Input
        value={data?.username}
        placeholder={t('Your username')}
        className={classes.input}
        onChange={onChangeUsername}
        readonly={readonly}
      />
      <Input
        value={data?.avatar}
        placeholder={t('Link to your avatar image')}
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
};
