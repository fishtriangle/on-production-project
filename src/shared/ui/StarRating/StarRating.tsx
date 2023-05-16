import { memo, useState } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import classes from './StarRating.module.scss';
import { Icon } from '@/shared/ui/Icon/Icon';
import StarIcon from '@/shared/assets/icons/star.svg';

interface StarRatingProps {
  className?: string;
  onSelect?: (starsCount: number) => void;
  size?: number;
  selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
  const {
    className, onSelect, size = 30, selectedStars = 0,
  } = props;

  const [currentStarsCount, setCurrentStarsCount] = useState(0);
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

  const starMods = (starNumber: number): Mods => ({
    [classes.hovered]: currentStarsCount >= starNumber,
    [classes.normal]: !(currentStarsCount >= starNumber),
    [classes.selected]: isSelected && currentStarsCount >= starNumber,
  });

  const onHover = (starsCount: number) => () => {
    if (!isSelected) {
      setCurrentStarsCount(starsCount);
    }
  };

  const onLeaveHover = () => {
    if (!isSelected) {
      setCurrentStarsCount(0);
    }
  };

  const onClick = (starsCount: number) => () => {
    if (!isSelected) {
      onSelect?.(starsCount);
      setCurrentStarsCount(starsCount);
      setIsSelected(true);
    } else {
      setCurrentStarsCount(0);
      setIsSelected(false);
    }
  };

  return (
    <div className={classNames(classes.StarRating, {}, [className])}>
      {stars.map((star) => (
        <Icon
          Svg={StarIcon}
          key={star}
          className={classNames(classes.star, starMods(star), [])}
          width={size}
          height={size}
          onMouseLeave={onLeaveHover}
          onMouseEnter={onHover(star)}
          onClick={onClick(star)}
        />
      ))}
    </div>
  );
});
