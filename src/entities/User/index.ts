export type { UserSchema, User } from './model/types/user';

export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
export { getUserIsInitiated } from './model/selectors/getUserIsInitiated/getUserIsInitiated';

export {
  userReducer,
  userActions,
} from './model/slice/userSlice';
