import {
  TypedUseSelectorHook,
  useSelector as useGenericSelector,
  useDispatch as useGenericDispatch
} from "react-redux";
import { Dispatch } from "redux";
import { RootAction, RootState } from "redux-observable";

export const useSelector: TypedUseSelectorHook<RootState> = useGenericSelector;

export const useDispatch: () => Dispatch<RootAction> = useGenericDispatch;
