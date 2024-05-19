import { ThunkDispatch, UnknownAction, configureStore } from "@reduxjs/toolkit";
import movieReducer from "./modules/Movie/index";

export type RootState = ReturnType<typeof movieReducer>;
export type AppThunkDispatch = ThunkDispatch<RootState, any, UnknownAction>;

const store = configureStore({
  reducer: movieReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type AppDispatch = typeof store.dispatch;

export default store;
