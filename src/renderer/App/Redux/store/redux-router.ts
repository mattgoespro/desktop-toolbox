import { createRouterReducer, createRouterMiddleware } from "@lagunovsky/redux-react-router";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();
export const routerReducer = createRouterReducer(history);
export const routerMiddleware = createRouterMiddleware(history);
