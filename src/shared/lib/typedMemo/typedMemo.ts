import { memo } from 'react';

export const typedMemo: <T>(value: T) => T = memo;
