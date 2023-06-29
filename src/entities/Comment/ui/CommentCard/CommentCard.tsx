import { memo } from 'react';

import { getRouteProfile } from '@/shared/const/router';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink';
import { Avatar } from '@/shared/ui/Avatar';
import { Skeleton } from '@/shared/ui/Skeleton';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import classes from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props;
  const mods: Mods = {};

  if (isLoading) {
    return (
      <VStack
        data-test-id="CommentCard.loading"
        maxWidth
        gap="8"
        className={classNames(classes.CommentCard, mods, [
          classes.loading,
          className,
        ])}
      >
        <div className={classes.header}>
          <Skeleton width={30} height={30} border="50%" />
          <Skeleton height={16} width={100} className={classes.username} />
        </div>
        <Skeleton width="100%" height={50} className={classes.text} />
      </VStack>
    );
  }

  return (
    <VStack
      gap="8"
      maxWidth
      className={classNames(classes.CommentCard, mods, [className])}
      data-testid="CommentCard.content"
    >
      <AppLink
        to={getRouteProfile(comment?.user.id || '')}
        className={classes.header}
      >
        {comment?.user.avatar && (
          <Avatar size={30} src={comment?.user.avatar} />
        )}
        <Text title={comment?.user.username} className={classes.username} />
      </AppLink>
      <Text text={comment?.text} className={classes.text} />
    </VStack>
  );
});
