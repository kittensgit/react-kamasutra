import { Action, applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from "redux";
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
import thunk, { ThunkAction } from 'redux-thunk';
//@ts-ignore
import appReducer from "./app-reducer.ts";
//@ts-ignore
import chatReducer from "./chat-reducer.ts";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReduser,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    chat: chatReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsType<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));


// let store = createStore(reducers, applyMiddleware(thunk))

export default store;