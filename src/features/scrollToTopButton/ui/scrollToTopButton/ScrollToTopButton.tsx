import { memo } from 'react';

import CircleUpImg from '@/shared/assets/icons/import/circle-up.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface ScrollToTopButtonProps {
  className?: string;
}

export const ScrollToTopButton = memo((props: ScrollToTopButtonProps) => {
  const { className } = props;

  const onClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Icon
      clickable
      onClick={onClick}
      Svg={CircleUpImg}
      width={32}
      height={32}
      className={classNames('', {}, [className])}
    />
  );
});
