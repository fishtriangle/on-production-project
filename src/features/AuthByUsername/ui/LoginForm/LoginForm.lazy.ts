import React, { FC } from 'react';
import { LoginFormProps } from 'features/AuthByUsername/ui/LoginForm/LoginForm';

const LoginFormLazy = React.lazy<FC<LoginFormProps>>(() => import('./LoginForm'));

export { LoginFormLazy };
