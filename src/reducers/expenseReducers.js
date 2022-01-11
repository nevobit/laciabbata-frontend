import { EXPENSE_DELETE_FAIL, EXPENSE_DELETE_REQUEST, EXPENSE_DELETE_RESET, EXPENSE_DELETE_SUCCESS, EXPENSE_LIST_FAIL, EXPENSE_LIST_REQUEST, EXPENSE_LIST_SUCCESS, EXPENSE_CREATE_FAIL, EXPENSE_CREATE_REQUEST, EXPENSE_CREATE_SUCCESS, EXPENSE_CREATE_RESET, } from "../constants/expenseConstants";

export const expensesListReducer = ( state = {expenses:[]}, action) => {
    switch (action.type) {
        case EXPENSE_LIST_REQUEST:
            return{loading:true};
        case EXPENSE_LIST_SUCCESS:
            return {loading: false, expenses: action.payload};
        case EXPENSE_LIST_FAIL:
            return {loading: false, error: action.payload};      
        default:
            return state;
    }
};


export const expenseCreateReducer = (state={}, action) => {
    switch (action.type) {
        case EXPENSE_CREATE_REQUEST:
            return{loading:true};
        case EXPENSE_CREATE_SUCCESS:
            return {loading: false, success: true};
        case EXPENSE_CREATE_FAIL:
            return {loading: false, error: action.payload};     
        case EXPENSE_CREATE_RESET:
                return {};  
        default:
            return state;
    }
};

export const expenseDeleteReducer = ( state = {}, action) => {
    switch (action.type) {
        case EXPENSE_DELETE_REQUEST:
            return{loading:true};
        case EXPENSE_DELETE_SUCCESS:
            return {loading: false, success: true};
        case EXPENSE_DELETE_FAIL:
            return {loading: false, error: action.payload};
        case EXPENSE_DELETE_RESET:
            return {};    
        default:
            return state;
    }
};