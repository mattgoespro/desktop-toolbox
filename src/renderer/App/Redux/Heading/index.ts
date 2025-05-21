// public API
import * as headingActions from "./actions";
import { headingStateReducer } from "./reducer";
import * as headingSelectors from "./selectors";

export type HeadingAction = typeof headingActions;

export { headingActions, headingSelectors, headingStateReducer };
