import { memo, useCallback } from 'react';

import CopyIcon from '@/shared/assets/icons/copy-icon.svg';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

import classes from './Code.module.scss';

interface CodeProps {
  className?: string;
  block: string;
}

export const Code = memo(({ className, block }: CodeProps) => {
  const mods: Mods = {};

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(block);
  }, [block]);

  return (
    <pre className={classNames(classes.Code, mods, [className])}>
      <Button onClick={onCopy} className={classes.copyBtn} theme={ButtonTheme.CLEAR}>
        <Icon Svg={CopyIcon} className={classes.copyIcon} />
      </Button>
      <code>
        {block}
      </code>
    </pre>
  );
});
