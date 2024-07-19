import { combineReducers } from "redux";

import AuthenticationReducer from "./AuthenticationReducer/AuthenticationReducer";
import AuthenticationReducerInterface from "./AuthenticationReducer/AuthenticationReducerInterface";

import AdoptionReducer from "./AdoptionReducer/AdoptionReducer";
import AdoptionReducerInterface from "./AdoptionReducer/AdoptionReducerInterface";

export interface RootState {
  authentication: AuthenticationReducerInterface;
  adoptionPost: AdoptionReducerInterface;
}

const rootReducer = combineReducers({
  authentication: AuthenticationReducer,
  adoptionPost: AdoptionReducer,
});

export default rootReducer;
