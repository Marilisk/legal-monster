import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import calendarSlice from "./calendarSlice";
import clientsSlice from "./clientsSlice";
import dashboardSlice from "./dashboardSlice";
import staffSlice from "./staffSlice";


export const store = configureStore({
    reducer: {
        auth: authSlice,
        clients: clientsSlice,
        calendar: calendarSlice,
        dashboard: dashboardSlice,
        staff: staffSlice,
    },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch