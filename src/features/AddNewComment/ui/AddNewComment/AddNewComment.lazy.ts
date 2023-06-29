import { FC, lazy } from 'react';

import { AddNewCommentProps } from './AddNewComment';

const AddNewCommentLazy = lazy<FC<AddNewCommentProps>>(
  () => import('./AddNewComment'),
);

export { AddNewCommentLazy };
