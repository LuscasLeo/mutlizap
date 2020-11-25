import { Reducer, useReducer } from "react";

export const getReducer = <T>(initialState: T) => {
    return useReducer<Reducer<T,(state: T) => T>>((state, action) => action(state), initialState);
}