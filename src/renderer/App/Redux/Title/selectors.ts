import store from "../Store";

export function selectTitle() {
  return store.getState().titleReducer.title;
}
