import { memo, useCallback } from 'react';

import CopyIcon from '@/shared/assets/icons/copy-icon.svg';
import CopyIconRedesigned from '@/shared/assets/icons/import/copy.svg';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Icon } from '@/shared/ui/redesigned/Icon';

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
    <ToggleFeatures
      featureName="isSiteRedesigned"
      on={
        <pre className={classNames(classes.CodeRedesigned, mods, [className])}>
          <Icon
            Svg={CopyIconRedesigned}
            className={classes.copyBtn}
            clickable
            onClick={onCopy}
          />
          <code>{block}</code>
        </pre>
      }
      off={
        <pre className={classNames(classes.Code, mods, [className])}>
          <Button
            onClick={onCopy}
            className={classes.copyBtn}
            theme={ButtonTheme.CLEAR}
          >
            <IconDeprecated Svg={CopyIcon} className={classes.copyIcon} />
          </Button>
          <code>{block}</code>
        </pre>
      }
    />
  );
});
