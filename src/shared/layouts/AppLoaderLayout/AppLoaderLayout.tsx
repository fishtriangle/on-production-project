import { memo } from 'react';

import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

import classes from './AppLoaderLayout.module.scss';
import { MainLayout } from '../MainLayout';

export const AppLoaderLayout = memo(() => (
  <MainLayout
    header={
      <HStack className={classes.header}>
        <Skeleton width={40} height={40} border="50%" />
      </HStack>
    }
    content={
      <VStack gap="16" style={{ height: '100%' }}>
        <Skeleton width="70%" height={32} border="16px" />
        <Skeleton width="40%" height={32} border="16px" />
        <Skeleton width="50%" height={32} border="16px" />
        <Skeleton width="30%" height={32} border="16px" />
        <Skeleton width="80%" height={32} border="16px" />
        <Skeleton width="80%" height={32} border="16px" />
      </VStack>
    }
    sidebar={<Skeleton border="32px" width={220} height="100%" />}
  />
));
