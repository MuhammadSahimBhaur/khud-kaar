import {
  LOGIN_ADMIN,
  REGISTER_ADMIN,
  AUTH_ADMIN,
  LOGOUT_ADMIN,
} from '../_actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_ADMIN:
      return { ...state, register: action.payload };
    case REGISTER_ADMIN:
      return { ...state, loginSucces: action.payload };
    case AUTH_ADMIN:
      return { ...state, adminData: action.payload };
    case LOGOUT_ADMIN:
      return { ...state };
    default:
      return state;
  }
}
