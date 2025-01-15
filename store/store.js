import { configureStore } from '@reduxjs/toolkit';
import { agendaApi } from './api/agendaApi';
import { authApi } from './api/authApi';
import agendaReducer from './slices/agendaSlice';

export const store = configureStore({
    reducer: {
        agenda: agendaReducer,
        [agendaApi.reducerPath]: agendaApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefault) => getDefault().concat(agendaApi.middleware).concat(authApi.middleware),
});
