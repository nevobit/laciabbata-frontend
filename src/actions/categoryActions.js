import Axios from "axios";
import {  CATEGORY_CREATE_FAIL, CATEGORY_CREATE_REQUEST, CATEGORY_CREATE_SUCCESS, CATEGORY_DELETE_FAIL, CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCESS, CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS } from "../constants/categoryConstants"

export const listCategories = () => async(dispatch) => {
    dispatch({type: CATEGORY_LIST_REQUEST});
    
    try{
        const {data} = await Axios.get('https://laciabbata-backend.herokuapp.com/api/categories');
        console.log(data);
        dispatch({type: CATEGORY_LIST_SUCCESS, payload: data});
    }catch(error){
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: CATEGORY_LIST_FAIL, payload: message});
    }
};


export const createCategory = (name) => async(dispatch) => {
    dispatch({type: CATEGORY_CREATE_REQUEST, payload: {name}});
    
    try{
        const {data} = await Axios.post('https://laciabbata-backend.herokuapp.com/api/categories/create', {name});
        console.log(data);
        dispatch({type: CATEGORY_CREATE_SUCCESS, payload: data});
    }catch(error){
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: CATEGORY_CREATE_FAIL, payload: message});
    }
};

export const deleteCategory = (id) => async(dispatch, getState) => {
    dispatch({type: CATEGORY_DELETE_REQUEST, payload: id});
    const {userSignin: {userInfo}} = getState();

    try{
        const {data} = await Axios.delete(`https://laciabbata-backend.herokuapp.com/api/categories/${id}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });

        dispatch({type: CATEGORY_DELETE_SUCCESS, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    }catch(error){
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: CATEGORY_DELETE_FAIL, payload: message});
    }
};
