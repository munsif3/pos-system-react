import axios from "axios";
import {
  GET_ORDER,
  GET_ORDER_LIST,
  ITEMS_LOADING,
  UPDATE_QTY,
  DELETE_ITEM_FROM_ORDER
} from "./types";

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
    type: UPDATE_QTY,
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

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
