import Axios from 'axios';
import { ADD_ITEM, REMOVE_ITEM, SELL_CREATE_FAIL, SELL_CREATE_REQUEST, SELL_CREATE_RESET, SELL_CREATE_SUCCESS, SELL_LIST_FAIL, SELL_LIST_REQUEST, SELL_LIST_SUCCESS } from '../constants/sellConstants';

export const addItem = (id, qty) => async(dispatch, getState) =>{
    const {data} = await Axios.get(`https://laciabbata-backend.herokuapp.com/api/products/${id}`);
    
    dispatch({
        type: ADD_ITEM,
        payload: {
            name: data.name,
            priceMajor: data.priceMajor,
            priceDetal: data.priceDetal,
            stock: data.stock,
            product: data._id,
            qty,
        }
    });

    localStorage.setItem('items', JSON.stringify(getState().cart.items));
};

export const removeItem = (id) => (dispatch, getState) => {
    dispatch({type: REMOVE_ITEM, payload: id });
 
 
   localStorage.setItem('items', JSON.stringify(getState().cart.items));
}

export const createSell = (sell) => async(dispatch, getState) =>{
    dispatch({type: SELL_CREATE_REQUEST, payload: sell});
    try{
        const {data} = await Axios.post('https://laciabbata-backend.herokuapp.com/api/sells', sell, {});
        dispatch({type: SELL_CREATE_SUCCESS, payload: data.sell});
        // dispatch({type: SELL_EMPTY})
    }catch(error){
        dispatch({type: SELL_CREATE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message,});
    }
}

export const listSells = () => async(dispatch) => {
    dispatch({type: SELL_LIST_REQUEST});
    try{
        const {data} = await Axios.get('https://laciabbata-backend.herokuapp.com/api/sells/list');
        dispatch({type: SELL_LIST_SUCCESS, payload: data});
    }catch(error){
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: SELL_LIST_FAIL, payload: message});
    }
};

export const clear = () => (dispatch) => {
    localStorage.removeItem('items');
    dispatch({type: SELL_CREATE_RESET});
}