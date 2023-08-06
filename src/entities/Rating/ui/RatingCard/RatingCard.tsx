import { memo, useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useDevice } from '@/shared/lib/hooks/useDevice/useDevice';
import {
  Button as ButtonDeprecated,
  ButtonSize,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Input } from '@/shared/ui/redesigned/Input';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { StarRating } from '@/shared/ui/redesigned/StarRating';
import { Text } from '@/shared/ui/redesigned/Text';

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
    <ToggleFeatures
      featureName="isSiteRedesigned"
      on={
        <>
          <Text title={feedbackTitle} />
          <Input
            data-testid="RatingCard.input"
            placeholder={t('Your comment for article') || undefined}
            value={feedback}
            onChange={setFeedback}
          />
        </>
      }
      off={
        <>
          <TextDeprecated title={feedbackTitle} />
          <InputDeprecated
            data-testid="RatingCard.input"
            placeholder={t('Your comment for article') || undefined}
            value={feedback}
            onChange={setFeedback}
          />
        </>
      }
    />
  );

  const content = (
    <>
      <VStack align="center" gap="8">
        <ToggleFeatures
          featureName="isSiteRedesigned"
          on={<Text title={title} />}
          off={<TextDeprecated title={title} />}
        />
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
            <ToggleFeatures
              featureName="isSiteRedesigned"
              on={
                <HStack maxWidth gap="16" justify="center">
                  <Button
                    variant="outline"
                    onClick={acceptHandler}
                    size="sizeXL"
                    fullWidth
                  >
                    {t('Send')}
                  </Button>
                </HStack>
              }
              off={
                <HStack maxWidth gap="16" justify="center">
                  <ButtonDeprecated
                    theme={ButtonTheme.OUTLINE}
                    onClick={acceptHandler}
                    size={ButtonSize.XL}
                    fullWidth
                  >
                    {t('Send')}
                  </ButtonDeprecated>
                </HStack>
              }
            />
          </VStack>
        </Drawer>
      ) : (
        <Modal isOpen={isModalOpened} lazy>
          <VStack align="center" gap="32" maxWidth>
            {modalContent}
            <ToggleFeatures
              featureName="isSiteRedesigned"
              on={
                <HStack maxWidth gap="16" justify="end">
                  <Button
                    variant="outline"
                    onClick={acceptHandler}
                    data-testid="RatingCard.send"
                  >
                    {t('Send')}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={cancelHandler}
                    data-testid="RatingCard.close"
                  >
                    {t('Close')}
                  </Button>
                </HStack>
              }
              off={
                <HStack maxWidth gap="16" justify="end">
                  <ButtonDeprecated
                    theme={ButtonTheme.OUTLINE}
                    onClick={acceptHandler}
                    data-testid="RatingCard.send"
                  >
                    {t('Send')}
                  </ButtonDeprecated>
                  <ButtonDeprecated
                    theme={ButtonTheme.OUTLINE_RED}
                    onClick={cancelHandler}
                    data-testid="RatingCard.close"
                  >
                    {t('Close')}
                  </ButtonDeprecated>
                </HStack>
              }
            />
          </VStack>
        </Modal>
      )}
    </>
  );

  return (
    <ToggleFeatures
      featureName="isSiteRedesigned"
      on={
        <Card data-testid="RatingCard" paddings="24" border="round" maxWidth>
          {content}
        </Card>
      }
      off={
        <CardDeprecated
          data-testid="RatingCard"
          maxWidth
          className={classNames('', mods, [className])}
        >
          {content}
        </CardDeprecated>
      }
    />
  );
});
