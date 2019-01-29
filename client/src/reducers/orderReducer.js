import {
  GET_ORDER,
  GET_ORDER_LIST,
  ITEMS_LOADING,
  UPDATE_QTY
} from "../actions/types";

const initialState = {
  orders: [],
  orderItems: [],
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
        orderItems: action.payload,
        loading: false
      };

    case UPDATE_QTY:
      return {
        ...state,
        orderItems: state.orderItems.map((orderItem, index) =>
          action.payload.id == index
            ? { ...orderItem, qty: action.payload.newQty }
            : orderItem
        )
      };

    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
}
