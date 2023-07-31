import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { UiDesignSwitcher } from '@/features/uiDesignSwitcher';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Page } from '@/widgets/Page';

// interface SettingsPageProps {
//   className?: string;
// }

const SettingsPage = memo(() => {
  const { t } = useTranslation();

  return (
    <Page>
      <Text title={t('Settings')} />
      <VStack gap="16">
        <UiDesignSwitcher />
      </VStack>
    </Page>
  );
});

export default SettingsPage;
