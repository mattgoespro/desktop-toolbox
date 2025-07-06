import { configureStore } from "@reduxjs/toolkit";
import iconSmithReducer from "./slices/iconsmith.slice";
import headingReducer from "./slices/heading.slice";
import alertsReducer from "./slices/alerts.slice";

export const store = configureStore({
  reducer: {
    iconSmithReducer,
    headingReducer,
    alertsReducer
  },
  preloadedState: {},
  /**
   * Redux DevTools configuration
   */
  devTools:
    process.env.NODE_ENV === "development"
      ? {
          name: "Desktop Toolbox DevTools",
          trace: true,
          traceLimit: 25,
          shouldHotReload: true
        }
      : false
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
