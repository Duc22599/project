import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import CurrentUser from "./index2";

const persistConfig = {
  key: "root",
  storage,
};

// const currentUser = createSlice({
//   name: "user",
//   initialState: {
//     currentUser: {},
//   },
//   reducers: {
//     setCurrentUser: (state, action) => {
//       state.currentUser = action.payload;
//     },
//   },
// });

const reducer = combineReducers({
  user: CurrentUser,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: [],
});

export const persistor = persistStore(store);
