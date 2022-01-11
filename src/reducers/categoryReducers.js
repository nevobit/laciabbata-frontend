import { CATEGORY_DELETE_FAIL, CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_RESET, CATEGORY_DELETE_SUCCESS, CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_CREATE_FAIL, CATEGORY_CREATE_REQUEST, CATEGORY_CREATE_SUCCESS, CATEGORY_CREATE_RESET, } from "../constants/categoryConstants";

export const categoriesListReducer = ( state = {categories:[]}, action) => {
    switch (action.type) {
        case CATEGORY_LIST_REQUEST:
            return{loading:true};
        case CATEGORY_LIST_SUCCESS:
            return {loading: false, categories: action.payload};
        case CATEGORY_LIST_FAIL:
            return {loading: false, error: action.payload};      
        default:
            return state;
    }
};


export const categoryCreateReducer = (state={}, action) => {
    switch (action.type) {
        case CATEGORY_CREATE_REQUEST:
            return{loading:true};
        case CATEGORY_CREATE_SUCCESS:
            return {loading: false, success: true};
        case CATEGORY_CREATE_FAIL:
            return {loading: false, error: action.payload};
        case CATEGORY_CREATE_RESET:
            return {};      
        default:
            return state;
    }
};

export const categoriesDeleteReducer = ( state = {}, action) => {
    switch (action.type) {
        case CATEGORY_DELETE_REQUEST:
            return{loading:true};
        case CATEGORY_DELETE_SUCCESS:
            return {loading: false, success: true};
        case CATEGORY_DELETE_FAIL:
            return {loading: false, error: action.payload};
        case CATEGORY_DELETE_RESET:
            return {};    
        default:
            return state;
    }
};