import { SIGN_IN, SIGN_OUT } from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedOut: true, userId: null }; // If user does not want to be associated with our application then userId value should be updated to null. 
    default:
      return state;
  }
};
