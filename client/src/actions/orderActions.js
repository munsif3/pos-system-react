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
  axios
    .get("api/v1/orders")
    .then(res =>
      dispatch({
        type: GET_ORDER_LIST,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const getOrder = id => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get(`api/v1/order-details/${id}`)
    .then(res => {
      dispatch({
        type: GET_ORDER,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const updateQuantity = (id, newQty) => dispatch => {
  dispatch({
    type: UPDATE_ITEM_COUNT_FROM_ORDER,
    payload: {
      id: Number(id),
      newQty: Number(newQty)
    }
  });
};

export const deleteItemFromOrder = (orderId, itemId) => dispatch => {
  axios
    .delete(`api/v1/order-details/${orderId}/item/${itemId}`)
    .then(res => {
      dispatch({
        type: DELETE_ITEM_FROM_ORDER,
        payload: {
          orderId: orderId,
          itemId: itemId
        }
      });
    })
    .catch(err => console.error(err));
};

export const addItemToOrder = (itemId, qty) => dispatch => {
  dispatch({
    type: ADD_ITEM_TO_ORDER,
    payload: {
      items: store.getState().item,
      newItem: {
        item_id: Number(itemId),
        qty: Number(qty)
      }
    }
  });
};

export const updateOrder = (order, orderId, total) => dispatch => {
  dispatch(setItemsLoading());
  axios
    .put(`api/v1/order-details/${orderId}`, order)
    .then(res => {
      dispatch({
        type: UPDATE_ORDER,
        payload: res.data
      });
      dispatch(updateOrderTotal(orderId, total));
    })
    .catch(err => console.error(err));
};

export const addNewOrder = order => dispatch => {
  dispatch(setItemsLoading());
  axios
    .post("api/v1/orders")
    .then(async orderId => {
      try {
        await axios.put(`api/v1/order-details/${orderId.data}`, order);
        dispatch(getOrders());
      } catch (err) {
        return console.log(err);
      }
    })
    .catch(err => console.error(err));
};

export const updateOrderTotal = (orderId, total) => dispatch => {
  axios
    .put(`api/v1/orders/${orderId}/price`, { total: total })
    .then(res => {
      dispatch(getOrders());
    })
    .catch(err => console.error(err));
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
