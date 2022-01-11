import Axios from "axios";
import { USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_DELETE_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_DELETE_SUCCESS, USER_DELETE_FAIL } from "../constants/userConstants"

export const listUsers = () => async(dispatch) => {
    dispatch({type: USER_LIST_REQUEST});
    
    try{
        const {data} = await Axios.get('https://laciabbata-backend.herokuapp.com/api/users');
        console.log(data);
        dispatch({type: USER_LIST_SUCCESS, payload: data});
    }catch(error){
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: USER_LIST_FAIL, payload: message});
    }
};

export const signin = (username, password) => async(dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload: {username, password}});
    
    try{
        const {data} = await Axios.post('https://laciabbata-backend.herokuapp.com/api/users/signin', {username, password});
        console.log(data);
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    }catch(error){
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: USER_SIGNIN_FAIL, payload: message});
    }
};

export const register = (name, username, password) => async(dispatch) => {
    dispatch({type: USER_REGISTER_REQUEST, payload: {name, username, password}});
    
    try{
        const {data} = await Axios.post('https://laciabbata-backend.herokuapp.com/api/users/register', {});
        console.log(data);
        dispatch({type: USER_REGISTER_SUCCESS, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    }catch(error){
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: USER_REGISTER_FAIL, payload: message});
    }
};

export const deleteUser = (id) => async(dispatch, getState) => {
    dispatch({type: USER_DELETE_REQUEST, payload: id});
    const {userSignin: {userInfo}} = getState();

    try{
        const {data} = await Axios.delete(`https://laciabbata-backend.herokuapp.com/api/users/${id}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });

        dispatch({type: USER_DELETE_SUCCESS, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    }catch(error){
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: USER_DELETE_FAIL, payload: message});
    }
};

export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({type: USER_SIGNOUT});
}