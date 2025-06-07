import {
  CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAILURE,
  READ_PRODUCTS_REQUEST, READ_PRODUCTS_SUCCESS, READ_PRODUCTS_FAILURE,
  UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE,
} from '../types';

import { toast } from 'react-toastify';

const API_URL = 'http://localhost:5000/api/products';

export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: READ_PRODUCTS_REQUEST });
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    dispatch({ type: READ_PRODUCTS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: READ_PRODUCTS_FAILURE, payload: err.message });
    toast.error('Failed to fetch products');
  }
};

export const createProduct = (product) => async (dispatch) => {
  dispatch({ type: CREATE_PRODUCT_REQUEST });
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    const data = await res.json();
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
    toast.success('Product created successfully');
  } catch (err) {
    dispatch({ type: CREATE_PRODUCT_FAILURE, payload: err.message });
    toast.error('Failed to create product');
  }
};

export const updateProduct = (product) => async (dispatch) => {
  dispatch({ type: UPDATE_PRODUCT_REQUEST });
  try {
    const res = await fetch(`${API_URL}/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    const data = await res.json();
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
    toast.success('Product updated successfully');
  } catch (err) {
    dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: err.message });
    toast.error('Failed to update product');
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_REQUEST });
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
    toast.success('Product deleted successfully');
  } catch (err) {
    dispatch({ type: DELETE_PRODUCT_FAILURE, payload: err.message });
    toast.error('Failed to delete product');
  }
};
