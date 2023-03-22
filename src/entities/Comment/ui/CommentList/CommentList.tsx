import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { CommentCard } from '../CommentCard/CommentCard';
import { Comment } from '../../model/types/comment';
import classes from './CommentList.module.scss';

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
  const {
    className,
    comments,
    isLoading,
  } = props;
  const mods: Mods = {};

  const { t } = useTranslation();

  return (
    <div className={classNames(classes.CommentList, mods, [className])}>
      {
        comments?.length
          ? comments.map((comment) => (
            <CommentCard
              comment={comment}
              key={comment.id}
              className={classes.comment}
              isLoading={isLoading}
            />
          ))
          : <Text text={t('There is no comments')} />
      }
    </div>
  );
});
