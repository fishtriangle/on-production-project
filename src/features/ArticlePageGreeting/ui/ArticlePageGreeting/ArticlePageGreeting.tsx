import { memo, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { saveJsonSettings, useUserSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDevice } from '@/shared/lib/hooks/useDevice/useDevice';
import { Drawer } from '@/shared/ui/Drawer';
import { Modal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';

export const ArticlePageGreeting = memo(() => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const { isArticlesPageWasOpened } = useUserSettings();

  useEffect(() => {
    if (!isArticlesPageWasOpened) {
      setIsOpen(true);
      dispatch(
        saveJsonSettings({
          isArticlesPageWasOpened: true,
        }),
      );
    }
  }, [dispatch, isArticlesPageWasOpened]);

  const onClose = () => setIsOpen(false);

  const isMobile = useDevice();

  const text = (
    <Text
      title={t('Welcome to Articles Page!')}
      text={t('Here you can find some articles.')}
    />
  );

  if (isMobile) {
    return (
      <Drawer isOpen={isOpen} onClose={onClose}>
        {text}
      </Drawer>
    );
  }

  return (
    <Modal lazy isOpen={isOpen} onClose={onClose}>
      {text}
    </Modal>
  );
});
