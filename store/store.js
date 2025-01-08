import { configureStore } from "@reduxjs/toolkit";
import { agendaApi } from "./api/agendaApi";
import agendaReducer from "./slices/agendaSlice";

export const store = configureStore({
  reducer: {
    agenda: agendaReducer,
    [agendaApi.reducerPath]: agendaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(agendaApi.middleware),
});