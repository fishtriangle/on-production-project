import { memo, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { getFeatureFlags, updateFeatureFlags } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ListBox } from '@/shared/ui/redesigned/PopUps';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface UiDesignSwitcherProps {
  className?: string;
}

export const UiDesignSwitcher = memo(({ className }: UiDesignSwitcherProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);
  const [isLoading, setIsLoading] = useState(false);

  const isSiteRedesigned = getFeatureFlags('isSiteRedesigned');

  const items = [
    {
      content: t('New'),
      value: 'new',
    },
    {
      content: t('Old'),
      value: 'old',
    },
  ];

  const onChange = async (value: string) => {
    if (authData) {
      setIsLoading(true);
      await dispatch(
        updateFeatureFlags({
          userId: authData.id,
          features: {
            isSiteRedesigned: value === 'new',
          },
        }),
      ).unwrap();
      setIsLoading(false);
    }
  };

  return (
    <HStack>
      <Text text={t('UI variant ')} />
      {isLoading ? (
        <Skeleton width={100} height={40} />
      ) : (
        <ListBox
          onChange={onChange}
          items={items}
          className={className}
          value={isSiteRedesigned ? 'new' : 'old'}
        />
      )}
    </HStack>
  );
});
