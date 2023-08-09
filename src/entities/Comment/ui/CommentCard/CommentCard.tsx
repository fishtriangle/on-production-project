import { memo } from 'react';

import { getRouteProfile } from '@/shared/const/router';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

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

  const Skeleton = toggleFeatures({
    name: 'isSiteRedesigned',
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
  });

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
    <ToggleFeatures
      featureName="isSiteRedesigned"
      on={
        <Card paddings="24" border="semi" maxWidth>
          <VStack
            gap="8"
            maxWidth
            className={classNames(classes.CommentCardRedesigned, mods, [
              className,
            ])}
            data-testid="CommentCard.content"
          >
            <AppLink to={getRouteProfile(comment?.user.id || '')}>
              <HStack gap="8">
                {comment?.user.avatar && (
                  <Avatar size={30} src={comment?.user.avatar} />
                )}
                <Text text={comment?.user.username} bold />
              </HStack>
            </AppLink>
            <Text text={comment?.text} />
          </VStack>
        </Card>
      }
      off={
        <VStack
          gap="8"
          maxWidth
          className={classNames(classes.CommentCard, mods, [className])}
          data-testid="CommentCard.content"
        >
          <AppLinkDeprecated
            to={getRouteProfile(comment?.user.id || '')}
            className={classes.header}
          >
            {comment?.user.avatar && (
              <AvatarDeprecated size={30} src={comment?.user.avatar} />
            )}
            <TextDeprecated
              title={comment?.user.username}
              className={classes.username}
            />
          </AppLinkDeprecated>
          <TextDeprecated text={comment?.text} className={classes.text} />
        </VStack>
      }
    />
  );
});
