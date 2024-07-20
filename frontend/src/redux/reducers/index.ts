import { combineReducers } from "redux";

import AuthenticationReducer from "./AuthenticationReducer/AuthenticationReducer";
import AuthenticationReducerInterface from "./AuthenticationReducer/AuthenticationReducerInterface";

import AdoptionReducer from "./AdoptionReducer/AdoptionReducer";
import AdoptionReducerInterface from "./AdoptionReducer/AdoptionReducerInterface";

import RescueReducerInterface from "./RescueReducer/RescueReducerInterface";
import RescueReducer from "./RescueReducer/RescueReducer"

export interface RootState {
  authentication: AuthenticationReducerInterface;
  adoptionPost: AdoptionReducerInterface;
  rescuePost: RescueReducerInterface
}

const rootReducer = combineReducers({
  authentication: AuthenticationReducer,
  adoptionPost: AdoptionReducer,
  rescuePost: RescueReducer,
});

export default rootReducer;
