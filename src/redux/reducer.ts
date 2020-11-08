import { combineReducers } from "@reduxjs/toolkit";

import { IUser, createUserReducer } from "./user";

export const createRootReducer = (initialState?: { user?: IUser }) => {
    return combineReducers({
        user: createUserReducer(initialState?.user),
    });
};
