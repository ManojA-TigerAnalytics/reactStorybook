import {
  AnyAction,
  combineReducers,
  configureStore,
  Middleware,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import recommenderReducer from "app/pages/recommender/slice/recommender.slice";
import { createLogger } from "redux-logger";
import authReducer from "./slice/authSlice";
import themeReducer from "./slice/themeSlice";

const development: boolean = process.env.NODE_ENV === "development";
const middleware: Middleware[] = [];

if (development) {
  const logger = createLogger({
    collapsed: (getState, action, logEntry) => !logEntry?.error,
  });
  middleware.push(logger);
}

const reducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  recommender: recommenderReducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    ...middleware,
  ],
  devTools: development,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;

export default store;
