import { ACTION_PROFILE_SET } from "../actions/profileActions";

const initialState = {
  profile: {
    weight: 0,
    height: 0,
    medicalConditions: "",
    disabilities: "",
    addressId: -1,
    programId: -1,
    workoutId: 0,
    setId: 0,
  },
};

export const profileReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case ACTION_PROFILE_SET:
      return {
        ...state,
        weight: action.payload.weight,
        height: action.payload.height,
        disabilities: action.payload.disabilities,
        medicalConditions: action.payload.medicalConditions,
        workoutId: action.payload.workoutId,
        setId: action.payload.setId,
        addressId: action.payload.addressId,
        programId: action.payload.programId,
      };
    default:
      return state;
  }
};
