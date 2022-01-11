import Axios from "axios";
import {  CLIENT_CREATE_FAIL, CLIENT_CREATE_REQUEST, CLIENT_CREATE_SUCCESS, CLIENT_DELETE_FAIL, CLIENT_DELETE_REQUEST, CLIENT_DELETE_SUCCESS, CLIENT_LIST_FAIL, CLIENT_LIST_REQUEST, CLIENT_LIST_SUCCESS } from "../constants/clientConstants"

export const listClients = () => async(dispatch) => {
    dispatch({type: CLIENT_LIST_REQUEST});
    
    try{
        const {data} = await Axios.get('https://laciabbata-backend.herokuapp.com/api/clients');
        console.log(data);
        dispatch({type: CLIENT_LIST_SUCCESS, payload: data});
    }catch(error){
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: CLIENT_LIST_FAIL, payload: message});
    }
};


export const createClient = (name, phone, address, type) => async(dispatch) => {
    dispatch({type: CLIENT_CREATE_REQUEST, payload: {name, phone, address, type}});
    
    try{
        const {data} = await Axios.post('https://laciabbata-backend.herokuapp.com/api/clients/create', {name, phone, address, type});
        console.log(data);
        dispatch({type: CLIENT_CREATE_SUCCESS, payload: data});
    }catch(error){
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: CLIENT_CREATE_FAIL, payload: message});
    }
};

export const deleteClient = (id) => async(dispatch, getState) => {
    dispatch({type: CLIENT_DELETE_REQUEST, payload: id});
    const {userSignin: {userInfo}} = getState();

    try{
        const {data} = await Axios.delete(`https://laciabbata-backend.herokuapp.com/api/clients/${id}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });

        dispatch({type: CLIENT_DELETE_SUCCESS, payload: data});
    }catch(error){
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: CLIENT_DELETE_FAIL, payload: message});
    }
};
