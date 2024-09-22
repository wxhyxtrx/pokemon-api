// import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import reducers from "./reducers";

export const store = configureStore({
    reducer: reducers,
});

const makeStore = () => store;
export const wrapper = createWrapper(makeStore);
