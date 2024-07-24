import { combineReducers } from "redux";

import AuthenticationReducer from "./AuthenticationReducer/AuthenticationReducer";
import AuthenticationReducerInterface from "./AuthenticationReducer/AuthenticationReducerInterface";

import AdoptionReducer from "./AdoptionReducer/AdoptionReducer";
import AdoptionReducerInterface from "./AdoptionReducer/AdoptionReducerInterface";

import RescueReducerInterface from "./RescueReducer/RescueReducerInterface";
import RescueReducer from "./RescueReducer/RescueReducer";

import VolunteerReducerInterface from "./VolunteerReducer/VolunteerReducerInterface";
import VolunteerReducer from "./VolunteerReducer/VolunteerReducer";

export interface RootState {
  authentication: AuthenticationReducerInterface;
  adoptionPost: AdoptionReducerInterface;
  rescuePost: RescueReducerInterface;
  volunteerPost: VolunteerReducerInterface;
}

const rootReducer = combineReducers({
  authentication: AuthenticationReducer,
  adoptionPost: AdoptionReducer,
  rescuePost: RescueReducer,
  volunteerPost: VolunteerReducer,
});

export default rootReducer;