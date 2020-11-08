import { createReducer } from "@reduxjs/toolkit";
import { IUser } from "./types";

import * as Actions from "./actions";

const defaultState: IUser = {
    token: null,
    profile: null,
};

export const createUserReducer = (initialState?: IUser) => {
    return createReducer<IUser>(initialState || defaultState, (builder) =>
        builder
            .addCase(Actions.login.pending, (state, { meta }) => ({
                ...state,
                token: meta.arg,
            }))
            .addCase(Actions.login.fulfilled, (state, { payload, meta }) => ({
                ...state,
                token: meta.arg,
                profile: payload,
            }))
            .addCase(Actions.login.rejected, () => defaultState)
            .addCase(Actions.logout.fulfilled, () => defaultState)
    );
};

export * from "./types";
