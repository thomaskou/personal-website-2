import {AnyAction, Reducer, combineReducers, StoreEnhancer, applyMiddleware, Store, createStore} from "redux";
// @ts-ignore
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
import SnakeReducer from "./snake/SnakeReducer";
import promiseMiddleware from "redux-promise";
import { createLogger } from "redux-logger";
import defaultStore, { IStore } from "./defaultStore";

export interface IAction<T = any, P = undefined> extends AnyAction {
    type: T;
    payload?: P;
}

const persistSnakeConfig = {
    key: "snake",
    storage,
};

const reducers: Reducer<any, any> = combineReducers({
    snakeStore: persistReducer(persistSnakeConfig, SnakeReducer),
});

const middleware: StoreEnhancer = applyMiddleware(
    promiseMiddleware,
    createLogger({collapsed: true}),
);

export const store: Store<IStore> = createStore(reducers, defaultStore, middleware);
export const persistor = persistStore(store);
