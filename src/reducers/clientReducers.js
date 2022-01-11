import { CLIENT_DELETE_FAIL, CLIENT_DELETE_REQUEST, CLIENT_DELETE_RESET, CLIENT_DELETE_SUCCESS, CLIENT_LIST_FAIL, CLIENT_LIST_REQUEST, CLIENT_LIST_SUCCESS, CLIENT_CREATE_FAIL, CLIENT_CREATE_REQUEST, CLIENT_CREATE_SUCCESS, CLIENT_CREATE_RESET, } from "../constants/clientConstants";

export const clientsListReducer = ( state = {clients:[]}, action) => {
    switch (action.type) {
        case CLIENT_LIST_REQUEST:
            return{loading:true};
        case CLIENT_LIST_SUCCESS:
            return {loading: false, clients: action.payload};
        case CLIENT_LIST_FAIL:
            return {loading: false, error: action.payload};      
        default:
            return state;
    }
};


export const clientCreateReducer = (state={}, action) => {
    switch (action.type) {
        case CLIENT_CREATE_REQUEST:
            return{loading:true};
        case CLIENT_CREATE_SUCCESS:
            return {loading: false, success: true};
        case CLIENT_CREATE_FAIL:
            return {loading: false, error: action.payload}; 
        case CLIENT_CREATE_RESET:
            return {};     
        default:
            return state;
    }
};

export const clientsDeleteReducer = ( state = {}, action) => {
    switch (action.type) {
        case CLIENT_DELETE_REQUEST:
            return{loading:true};
        case CLIENT_DELETE_SUCCESS:
            return {loading: false, success: true};
        case CLIENT_DELETE_FAIL:
            return {loading: false, error: action.payload};
        case CLIENT_DELETE_RESET:
            return {};    
        default:
            return state;
    }
};