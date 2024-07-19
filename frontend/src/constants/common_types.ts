import { ThunkAction } from "redux-thunk";
import { RootState } from "../redux/store";

export interface Action {
  type: string;
  payload?: any;
}

export type Actiontype = ThunkAction<void, RootState, unknown, Action>;
