import { configureStore } from "@reduxjs/toolkit";
import { authSlice, teacherSlice } from "./";
 
export const store = configureStore({
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: false, // Desactiva el middleware de thunk si no lo estás utilizando
      serializableCheck: false,
    });
  },
  reducer: {
    auth: authSlice.reducer,
    teacher: teacherSlice.reducer,
  },
});