import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
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

export default store;
