export type { UserSchema, User } from './model/types/user';

export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';

export {
  userReducer,
  userActions,
} from './model/slice/userSlice';
