import Axios from "axios";
import {  EXPENSE_CREATE_FAIL, EXPENSE_CREATE_REQUEST, EXPENSE_CREATE_SUCCESS, EXPENSE_DELETE_FAIL, EXPENSE_DELETE_REQUEST, EXPENSE_DELETE_SUCCESS, EXPENSE_LIST_FAIL, EXPENSE_LIST_REQUEST, EXPENSE_LIST_SUCCESS } from "../constants/expenseConstants"

export const listExpenses = () => async(dispatch) => {
    dispatch({type: EXPENSE_LIST_REQUEST});
    
    try{
        const {data} = await Axios.get('https://laciabbata-backend.herokuapp.com/api/expenses');
        console.log(data);
        dispatch({type: EXPENSE_LIST_SUCCESS, payload: data});
    }catch(error){
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: EXPENSE_LIST_FAIL, payload: message});
    }
};


export const createExpense = (name, value) => async(dispatch) => {
    dispatch({type: EXPENSE_CREATE_REQUEST, payload: {name, value}});
    
    try{
        const {data} = await Axios.post('https://laciabbata-backend.herokuapp.com/api/expenses/create', {name, value});
        console.log(data);
        dispatch({type: EXPENSE_CREATE_SUCCESS, payload: data});
    }catch(error){
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: EXPENSE_CREATE_FAIL, payload: message});
    }
};

export const deleteExpense = (id) => async(dispatch, getState) => {
    dispatch({type: EXPENSE_DELETE_REQUEST, payload: id});
    const {userSignin: {userInfo}} = getState();

    try{
        const {data} = await Axios.delete(`https://laciabbata-backend.herokuapp.com/api/expenses/${id}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });

        dispatch({type: EXPENSE_DELETE_SUCCESS, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    }catch(error){
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: EXPENSE_DELETE_FAIL, payload: message});
    }
};
