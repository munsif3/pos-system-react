import {
  GET_ORDER,
  GET_ORDER_LIST,
  ITEMS_LOADING,
  UPDATE_ITEM_COUNT_FROM_ORDER,
  DELETE_ITEM_FROM_ORDER,
  ADD_ITEM_TO_ORDER,
  UPDATE_ORDER,
  ADD_ORDER
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

    case UPDATE_ORDER:
      return {
        ...state,
        orderItems: [...state.orderItems],
        loading: false
      };

    case ADD_ORDER:
      return {
        ...state,
        orderItems: action.payload,
        loading: false
      };

    case UPDATE_ITEM_COUNT_FROM_ORDER:
      return {
        ...state,
        orderItems:
          action.payload.id !== -1
            ? state.orderItems.map((orderItem, index) =>
                action.payload.id == index
                  ? { ...orderItem, qty: action.payload.newQty }
                  : orderItem
              )
            : [...state.orderItems]
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
      const index = state.orderItems.findIndex(
        element => element["item_id"] === Number(action.payload.itemId)
      );
      let items = [];
      if (index === -1) {
        action.payload.items.items.map(({ item_id, unit_price }) =>
          newItem.item_id === item_id
            ? (newItem.unit_price = unit_price)
            : newItem
        );
        items = [...state.orderItems, newItem];
      } else {
        items = [...state.orderItems];
        items[index].qty += Number(action.payload.qty);
      }

      return {
        ...state,
        orderItems: [...items]
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
