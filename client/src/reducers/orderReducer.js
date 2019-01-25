import { GET_ORDER, GET_ORDER_LIST } from "../actions/types";

const initialState = {
  orders: [],
  order: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER_LIST:
      return {
        ...state,
        orders: action.payload,
        loading: false
      };

    case GET_ORDER:
      return {
        ...state,
        order: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
