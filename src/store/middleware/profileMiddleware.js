import { API_URL } from "../../API";
import keycloak from "../../Keycloak";
import {
  ACTION_PROFILE_CREATE,
  ACTION_PROFILE_FETCH,
  ACTION_PROFILE_UPDATE,
  profileCreateAction,
  profileFetchAction,
  profileResetAction,
  profileSetAction,
} from "../actions/profileActions";

export const profileMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    if (action.type === ACTION_PROFILE_CREATE) {
      // Takes the new user object as action.payload. Only "id" is required in this object for profile creation.

      if (action.payload.id === undefined) {
        console.error("Invalid user ID. Cannot create new user.");
        return;
      }

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${keycloak.token}`
          
        },
        body: JSON.stringify({
          id: action.payload.id,
          addressId: action.payload.addressId,
          programId: action.payload.programId,
          workoutId: action.payload.workoutId,
          setId: action.payload.setId,
          weight: action.payload.weight,
          height: action.payload.height,
          medicalConditions: action.payload.medicalConditions,
          disabilities: action.payload.disabilities,
        }),
      };

      fetch(`${API_URL}api/Profile`, requestOptions)
        .then((response) => {
          response.json();
        })
        .then((result) =>
          // Update state with newly created profile
          dispatch(profileFetchAction(keycloak.idTokenParsed.sub))
        )
        .catch((e) => {
          console.error(e);
          dispatch(profileResetAction())
        });
    } else if (action.type === ACTION_PROFILE_FETCH) {
      // Fetches profile from database. Creates a new profile if it does not exist

      const requestOptions = {
        headers: {
          id: action.payload,
          "Content-Type": "application/json",
          'Authorization': `Bearer ${keycloak.token}`
        },
      };

      fetch(`${API_URL}api/Profile`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === 404) {
            console.log("Profile does not exist. Creating a new one.");
            dispatch(profileCreateAction({ id: action.payload }));
          } else dispatch(profileSetAction(result));
        })
        .catch((e) => {
          console.error(e);
          dispatch(profileResetAction())
        });
    } else if (action.type === ACTION_PROFILE_UPDATE) {
      // Update profile in database

      const requestOptions = {
        method: "PUT",
        headers: {
          id: action.payload.id,
          "Content-Type": "application/json",
          'Authorization': `Bearer ${keycloak.token}`
        },
        body: JSON.stringify({
          id: action.payload.id,
          addressId: action.payload.addressId,
          programId: action.payload.programId,
          workoutId: action.payload.workoutId,
          setId: action.payload.setId,
          weight: action.payload.weight,
          height: action.payload.height,
          medicalConditions: action.payload.medicalConditions,
          disabilities: action.payload.disabilities,
        }),
      };

      fetch(`${API_URL}api/Profile`, requestOptions)
        .then((response) => {
          if (response.status === 404) {
            console.error("Update failed. Something is missing in database.");
          } else dispatch(profileFetchAction(action.payload.id));
        })
        .catch((e) => {
          console.error(e);
          dispatch(profileResetAction())
        });
    }
  };
