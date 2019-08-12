import {AnyAction} from "redux";

export interface IAction<T = any, P = undefined> extends AnyAction {
    type: T;
    payload?: P;
}
