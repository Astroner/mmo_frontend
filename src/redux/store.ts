import { configureStore } from "@reduxjs/toolkit";
import { createRootReducer } from "./reducer";

type Arg = Parameters<typeof createRootReducer>[0];

export const createStore = (init?: Arg) => {
    return configureStore({
        reducer: createRootReducer(init),
    });
};

export type RootStore = ReturnType<ReturnType<typeof createStore>["getState"]>;
