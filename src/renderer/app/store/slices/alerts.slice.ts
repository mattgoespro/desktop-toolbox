import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AlertPage = "dashboard" | "iconsmith";

type Alert = {
  id: string;
  page: AlertPage;
  message: string;
  severity: "error" | "warning" | "info" | "success";
};

type AlertState = {
  dashboard: Alert[];
  iconsmith: Alert[];
};

const initialState: AlertState = {
  dashboard: [],
  iconsmith: []
};

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    showAlert(state, action: PayloadAction<Alert, "showAlert">) {
      const alert = action.payload;
      state[alert.page].push(alert);
    },
    dismissAlert(state, action: PayloadAction<{ page: AlertPage; id: string }, "dismissAlert">) {
      const { page, id } = action.payload;
      state[page] = state[page].filter((alert) => alert.id !== id);
    }
  }
});

export const { showAlert } = alertsSlice.actions;

export default alertsSlice.reducer;
