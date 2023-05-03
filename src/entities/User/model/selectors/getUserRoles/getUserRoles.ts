import { StateSchema } from 'app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';

export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;

export const isUserAdmin = createSelector(getUserRoles, (roles) => Boolean(roles?.includes('ADMIN')));
export const isUserManager = createSelector(getUserRoles, (roles) => Boolean(roles?.includes('MANAGER')));
