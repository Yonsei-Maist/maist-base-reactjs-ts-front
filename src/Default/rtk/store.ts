import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { configureStore, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";

import { defaultService } from "./api/services/defaultService";
import configReducer from "./slice/config/configSlice";
import defaultReducer from "./slice/default/defaultSlice";

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (action && action.error && action.error.message) {
      console.log(`Error: `, action.error.message);
      // TODO: Handle global error, maybe just Toast
    }
    return next(action);
  };

export const store = configureStore({
  reducer: {
    config: configReducer,
    default: defaultReducer,
    [defaultService.reducerPath]: defaultService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      defaultService.middleware,
      rtkQueryErrorLogger,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
