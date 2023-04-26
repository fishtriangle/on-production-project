import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/ui/Page/Page';
import { VStack } from 'shared/ui/Stack/VStack/VStack';
import { EditableProfileCard } from 'features/EditableProfileCard';
import { Text, TextTheme } from 'shared/ui/Text/Text';

interface ProfilePageProps {
  className?: string;
}

const ProfilePage = memo(({ className }: ProfilePageProps) => {
  const { t } = useTranslation('profile');

  const { id } = useParams<{id: string}>();

  if (!id) {
    return (
      <Text title={t('Error! No profile found')} theme={TextTheme.ERROR} />
    );
  }

  return (
    <Page className={classNames('', {}, [className])}>
      <VStack gap="16" maxWidth>
        <EditableProfileCard id={id} />
      </VStack>
    </Page>
  );
});

export default ProfilePage;
