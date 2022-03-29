import { ACTION_PROFILE_RESET, ACTION_PROFILE_SET } from "../actions/profileActions";

const initialState = {
  weight: 0,
  height: 0,
  medicalConditions: "",
  disabilities: "",
  addressId: 0,
  programId: 0,
  workoutId: 0,
  setId: 0,
};

export const profileReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case ACTION_PROFILE_SET:
      // Construct new state without fields which are null
      let newState = {}
      if (action.payload.weight){
        newState.weight = action.payload.weight
      }
      if (action.payload.height){
        newState.height = action.payload.height
      }
      if (action.payload.disabilities){
        newState.disabilities = action.payload.disabilities
      }
      if (action.payload.medicalConditions){
        newState.medicalConditions = action.payload.medicalConditions
      }
      if (action.payload.workoutId){
        newState.workoutId = action.payload.workoutId
      }
      if (action.payload.setId){
        newState.setId = action.payload.setId
      }
      if (action.payload.addressId){
        newState.addressId = action.payload.addressId
      }
      if (action.payload.programId){
        newState.programId = action.payload.programId
      }
      return newState;

    case ACTION_PROFILE_RESET:
      return initialState;
      
    default:
      return state;
  }
};
