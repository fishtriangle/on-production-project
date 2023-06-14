import React, { FC } from 'react';

import { LoginFormProps } from './LoginForm';

const LoginFormLazy = React.lazy<FC<LoginFormProps>>(() => import('./LoginForm'));

export { LoginFormLazy };
