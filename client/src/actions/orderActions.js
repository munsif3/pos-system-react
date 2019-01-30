import axios from "axios";
import {
  GET_ORDER,
  GET_ORDER_LIST,
  ITEMS_LOADING,
  UPDATE_ITEM_COUNT_FROM_ORDER,
  DELETE_ITEM_FROM_ORDER,
  ADD_ITEM_TO_ORDER,
  UPDATE_ORDER
} from "./types";
import store from "../store";

export const getOrders = () => dispatch => {
  dispatch(setItemsLoading());
  axios.get("/api/v1/orders").then(res =>
    dispatch({
      type: GET_ORDER_LIST,
      payload: res.data
    })
  );
};

export const getOrder = id => dispatch => {
  dispatch(setItemsLoading());
  axios.get(`/api/v1/order-details/${id}`).then(res => {
    dispatch({
      type: GET_ORDER,
      payload: res.data
    });
  });
};

export const updateQuantity = (id, newQty) => dispatch => {
  dispatch({
    type: UPDATE_ITEM_COUNT_FROM_ORDER,
    payload: {
      id: id,
      newQty: newQty
    }
  });
};

export const deleteItemFromOrder = id => dispatch => {
  dispatch({
    type: DELETE_ITEM_FROM_ORDER,
    payload: id
  });
};

export const addItemToOrder = (itemId, qty) => dispatch => {
  dispatch({
    type: ADD_ITEM_TO_ORDER,
    payload: {
      items: store.getState().item,
      itemId: itemId,
      qty: qty
    }
  });
};

export const updateOrder = order => dispatch => {
  dispatch({
    type: UPDATE_ORDER,
    payload: order
  });
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
