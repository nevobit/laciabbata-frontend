import Axios from "axios";
import {  PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants"

export const listProducts = () => async(dispatch) => {
    dispatch({type: PRODUCT_LIST_REQUEST});
    
    try{
        const {data} = await Axios.get('https://laciabbata-backend.herokuapp.com/api/products');
        console.log(data);
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    }catch(error){
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: PRODUCT_LIST_FAIL, payload: message});
    }
};


export const createProduct = (name, category, code, buyPrice, priceDetal, priceMajor, stock) => async(dispatch) => {
    dispatch({type: PRODUCT_CREATE_REQUEST, payload: {name, category, code, buyPrice, priceDetal, priceMajor, stock}});
    
    try{
        const {data} = await Axios.post('https://laciabbata-backend.herokuapp.com/api/products/create', {name, category, code, buyPrice, priceDetal, priceMajor, stock});
        console.log(data);
        dispatch({type: PRODUCT_CREATE_SUCCESS, payload: data});
    }catch(error){
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: PRODUCT_CREATE_FAIL, payload: message});
    }
};

export const deleteProduct = (id) => async(dispatch, getState) => {
    dispatch({type: PRODUCT_DELETE_REQUEST, payload: id});
    const {userSignin: {userInfo}} = getState();

    try{
        const {data} = await Axios.delete(`https://laciabbata-backend.herokuapp.com/api/products/${id}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });

        dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data});
    }catch(error){
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: PRODUCT_DELETE_FAIL, payload: message});
    }
};
