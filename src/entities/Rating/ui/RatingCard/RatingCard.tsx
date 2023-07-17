import { memo, useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useDevice } from '@/shared/lib/hooks/useDevice/useDevice';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/depricated/Button';
import { Card } from '@/shared/ui/depricated/Card';
import { Drawer } from '@/shared/ui/depricated/Drawer';
import { Input } from '@/shared/ui/depricated/Input';
import { Modal } from '@/shared/ui/depricated/Modal';
import { StarRating } from '@/shared/ui/depricated/StarRating';
import { Text } from '@/shared/ui/depricated/Text';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
  rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
  const {
    feedbackTitle,
    hasFeedback,
    onCancel,
    onAccept,
    title,
    className,
    rate,
  } = props;

  const { t } = useTranslation();

  const isMobile = useDevice();

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [starsCount, setStarsCount] = useState(rate || 0);
  const [feedback, setFeedback] = useState('');

  const mods: Mods = {};

  const onSelectStars = useCallback(
    (selectedStarsCount: number) => {
      setStarsCount(selectedStarsCount);
      if (selectedStarsCount > 0) {
        if (hasFeedback) {
          setIsModalOpened(true);
          setFeedback('');
        } else {
          onAccept?.(selectedStarsCount);
        }
      }
    },
    [hasFeedback, onAccept],
  );

  const acceptHandler = useCallback(() => {
    setIsModalOpened(false);
    onAccept?.(starsCount, feedback);
  }, [feedback, onAccept, starsCount]);

  const cancelHandler = useCallback(() => {
    setIsModalOpened(false);
    onCancel?.(starsCount);
  }, [onCancel, starsCount]);

  const modalContent = (
    <>
      <Text title={feedbackTitle} />
      <Input
        data-testid="RatingCard.input"
        placeholder={t('Your comment for article') || undefined}
        value={feedback}
        onChange={setFeedback}
      />
    </>
  );

  return (
    <Card
      data-testid="RatingCard"
      maxWidth
      className={classNames('', mods, [className])}
    >
      <VStack align="center" gap="8">
        <Text title={title} />
        <StarRating
          size={40}
          onSelect={onSelectStars}
          selectedStars={starsCount}
        />
      </VStack>

      {isMobile ? (
        <Drawer isOpen={isModalOpened} onClose={cancelHandler}>
          <VStack align="start" gap="32" maxWidth>
            {modalContent}
            <HStack maxWidth gap="16" justify="center">
              <Button
                theme={ButtonTheme.OUTLINE}
                onClick={acceptHandler}
                size={ButtonSize.XL}
                fullWidth
              >
                {t('Send')}
              </Button>
            </HStack>
          </VStack>
        </Drawer>
      ) : (
        <Modal isOpen={isModalOpened} lazy>
          <VStack align="center" gap="32" maxWidth>
            {modalContent}
            <HStack maxWidth gap="16" justify="end">
              <Button
                theme={ButtonTheme.OUTLINE}
                onClick={acceptHandler}
                data-testid="RatingCard.send"
              >
                {t('Send')}
              </Button>
              <Button
                theme={ButtonTheme.OUTLINE_RED}
                onClick={cancelHandler}
                data-testid="RatingCard.close"
              >
                {t('Close')}
              </Button>
            </HStack>
          </VStack>
        </Modal>
      )}
    </Card>
  );
});
