// import {FETCH_USER} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case "FETCH_USER":
      return action.payload || false;
    case "FETCH_USER_AFTER_CURRENT_ADDRESS_UPDATE":
      return { ...state, currentAddress: action.payload.addressID };
      debugger;
    default:
      return state;
  }
}
