import { User } from 'interfaces';
import { BaseActionType } from 'store/types';
import { ItemActionType, UserActions } from 'store/user/actions';

type UserReducer = {
  data: User | null;
  isLoading: boolean;
  error?: string;
};

const defaultReducer: UserReducer = {
  data: null,
  isLoading: true,
};

export function userReducer(
  state: UserReducer = defaultReducer,
  action: BaseActionType<UserActions> | ItemActionType,
): UserReducer {
  switch (action.type) {
    case UserActions.FETCH_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case UserActions.FETCH_USER_SUCCESS:
      return {
        ...state,
        data: (action as ItemActionType).item,
        isLoading: false,
      };
    case UserActions.USER_UPDATE_SUCCESS:
      return {
        ...state,
        data: (action as ItemActionType).item,
      };
    case UserActions.FETCH_USER_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case UserActions.CLEAR_USER:
      return {
        ...state,
        data: null,
      };
    case UserActions.USER_LOGOUT:
      return {
        ...state,
        data: null,
      };
    default:
      return state;
  }
}
