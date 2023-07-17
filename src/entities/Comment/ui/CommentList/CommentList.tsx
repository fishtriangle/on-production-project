import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/depricated/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';

import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
  const { className, comments, isLoading } = props;
  const mods: Mods = {};

  const { t } = useTranslation();

  if (isLoading) {
    return (
      <VStack gap="16" maxWidth className={classNames('', mods, [className])}>
        <CommentCard isLoading={isLoading} />
        <CommentCard isLoading={isLoading} />
        <CommentCard isLoading={isLoading} />
      </VStack>
    );
  }

  return (
    <VStack gap="16" maxWidth className={classNames('', mods, [className])}>
      {comments?.length ? (
        comments.map((comment) => (
          <CommentCard
            comment={comment}
            key={comment.id}
            isLoading={isLoading}
          />
        ))
      ) : (
        <Text text={t('There is no comments')} />
      )}
    </VStack>
  );
});
