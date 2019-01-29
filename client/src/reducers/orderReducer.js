import {
  GET_ORDER,
  GET_ORDER_LIST,
  ITEMS_LOADING,
  UPDATE_QTY,
  DELETE_ITEM_FROM_ORDER,
  ADD_ITEM_TO_ORDER
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

    case DELETE_ITEM_FROM_ORDER:
      return {
        ...state,
        orderItems: state.orderItems.filter(
          orderItem => orderItem["item_id"] !== action.payload
        )
      };

    case ADD_ITEM_TO_ORDER:
      const newItem = {
        item_id: Number(action.payload.itemId),
        qty: Number(action.payload.qty)
      };

      let index = state.orderItems.findIndex(
        element => element["item_id"] == action.payload.itemId
      );

      if (index > -1) {
        state.orderItems[index] = { ...state.orderItems[index] };
        state.orderItems[index]["qty"] += newItem.qty;
      }

      return {
        ...state,
        orderItems:
          index > -1 ? [...state.orderItems] : [...state.orderItems, newItem]
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
