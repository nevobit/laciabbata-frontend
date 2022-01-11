import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from 'redux-thunk';
import { productsDeleteReducer, productsListReducer, productCreateReducer } from "./reducers/productReducers";
import { categoriesDeleteReducer, categoriesListReducer, categoryCreateReducer } from "./reducers/categoryReducers";
import { userRegisterReducer, usersDeleteReducer, userSigninReducer, usersListReducer } from "./reducers/userReducers";
import { clientCreateReducer, clientsDeleteReducer, clientsListReducer } from "./reducers/clientReducers";
import { addReducer, sellCreateReducer, sellsListReducer } from "./reducers/sellReducers";
import { expenseCreateReducer, expenseDeleteReducer, expensesListReducer } from "./reducers/expenseReducers";

const initialState ={
    
    cart:{
        items: localStorage.getItem('items')
        ? JSON.parse(localStorage.getItem('items'))
        : [],
    },

    userSignin: {
        userInfo: localStorage.getItem('userInfo')
          ? JSON.parse(localStorage.getItem('userInfo'))
          : null,
      },
}

const reducer = combineReducers({
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    usersList: usersListReducer,
    usersDelete: usersDeleteReducer,
    
    categoriesList: categoriesListReducer,
    categoryCreate: categoryCreateReducer,
    categoryDelete: categoriesDeleteReducer,

    productsList: productsListReducer,
    productCreate: productCreateReducer,
    productDelete: productsDeleteReducer,
    
    clientsList: clientsListReducer,
    clientCreate: clientCreateReducer,
    clientDelete: clientsDeleteReducer,
    
    sellsList: sellsListReducer,
    sellCreate: sellCreateReducer,
    // sellDelete: productsDeleteReducer,
    
    
    expensesList: expensesListReducer,
    expenseCreate: expenseCreateReducer,
    expenseDelete: expenseDeleteReducer,


    cart: addReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;