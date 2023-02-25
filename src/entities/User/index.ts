import { UserSchema, User } from './model/types/user';

export {
  userReducer,
  userActions,
} from './model/slice/userSlice';

export type IUser = User;
export type IUserSchema = UserSchema;
