import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { pizzaReducer } from "./slices/pizzaSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        pizzas: pizzaReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

