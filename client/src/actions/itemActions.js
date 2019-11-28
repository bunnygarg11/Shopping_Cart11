import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';
// import { returnErrors } from './errorActions';
import { returnErrors } from './errorActions';

export const getItems = (product_Id) => dispatch => {
  dispatch(setItemsLoading());
  axios
    .patch('/api/items',{product_Id})
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const getProducts = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get('/api/items/products')
    .then(res =>
      dispatch({
        type: "GET_PRODUCTS",
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
}
export const addItem = item => (dispatch, getState) => {
  axios
    .post('/api/items', item, tokenConfig(getState))
    .then(res =>
     
      dispatch({
        type: ADD_ITEM,
        payload: res.data.product
      })
    )
    .catch(err =>{
      dispatch(
        returnErrors(err.response.data, err.response.status,"PRODUCT_REPEATED")
      );
      dispatch({
        type:"PRODUCT_REPEATED"
      })
    })
    
};
export const deleteItem = id => (dispatch, getState) => {
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateItem = item => (dispatch, getState) => {

  console.log(item)
  axios
    .post('/api/items/update', item, tokenConfig(getState))
    .then(res =>{
console.log("ghsfgsh")
     return dispatch({
        type: "UPDATE_ITEM",
        payload: res.data
      })
    }).catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
};
export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
