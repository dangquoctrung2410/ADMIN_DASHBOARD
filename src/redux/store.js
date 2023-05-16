import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import authSlice from "./authSlice";
import userSlice from "./userSlice";
import taskReducer from "./taskSlice";
import usersSlice from "./usersSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["isLogin", "user"],
};

const persistedReducer = persistReducer(rootPersistConfig, authSlice);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    user: userSlice,
    task: taskReducer,
    reload: usersSlice,
  },
});

export const persistor = persistStore(store);
