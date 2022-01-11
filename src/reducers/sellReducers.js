import { ADD_ITEM, REMOVE_ITEM, SELL_CREATE_FAIL, SELL_CREATE_REQUEST, SELL_CREATE_RESET, SELL_CREATE_SUCCESS, SELL_LIST_FAIL, SELL_LIST_REQUEST, SELL_LIST_SUCCESS } from '../constants/sellConstants';

export const addReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const item = action.payload;
      const existItem = state.items.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          items: state.items.map((x) =>
            x.product === item.product ? item : x
          ),
        };
      } else {
        return { ...state, items: [...state.items, item] };
      }
      case REMOVE_ITEM:
        return {...state, items: state.items.filter((x) => x.product !== action.payload)};
    default:
      return state;
  }
};

export const  sellCreateReducer = (state = {}, action) =>{
  switch (action.type) {
      case SELL_CREATE_REQUEST:
          return {loading: true};
      case SELL_CREATE_SUCCESS:
          return {loading: false, success: true, sell: action.payload};    
      case SELL_CREATE_FAIL:
          return {loading: false, error: action.payload};
      case SELL_CREATE_RESET:
          return {};    
      default:
          return state;
  }
};

export const sellsListReducer = ( state = {sells:[]}, action) => {
  switch (action.type) {
      case SELL_LIST_REQUEST:
          return{loading:true};
      case SELL_LIST_SUCCESS:
          return {loading: false, sells: action.payload};
      case SELL_LIST_FAIL:
          return {loading: false, error: action.payload};      
      default:
          return state;
  }
};
