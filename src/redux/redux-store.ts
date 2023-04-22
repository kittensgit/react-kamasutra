import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from "redux";
//@ts-ignore
import profileReducer from "./profile-reducer.ts";
//@ts-ignore
import dialogsReducer from "./dialogs-reducer.ts";
//@ts-ignore
import sidebarReduser from "./sidebar-reducer.ts";
//@ts-ignore
import usersReducer from "./users-reducer.ts";
//@ts-ignore
import authReducer from "./auth-reducer.ts";
import thunk from 'redux-thunk';
//@ts-ignore
import appReducer from "./app-reducer.ts";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReduser,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never ;
export type InferActionsType<T extends {[key: string]: (...args: any[])=>any}> = ReturnType<PropertiesType<T>>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));


// let store = createStore(reducers, applyMiddleware(thunk))

export default store;