export const ACTION_PROFILE_FETCH = "[profile] fetch";
export const ACTION_PROFILE_CREATE = "[profile] create";
export const ACTION_PROFILE_SET = "[profile] set";
export const ACTION_PROFILE_UPDATE = "[profile] update";

export const profileFetchAction = (userId) => ({
  type: ACTION_PROFILE_FETCH,
  payload: userId,
});

export const profileCreateAction = (newProfile) => ({
  type: ACTION_PROFILE_CREATE,
  payload: newProfile,
});

// sets profile state
export const profileSetAction = (newProfile) => ({
  type: ACTION_PROFILE_SET,
  payload: newProfile,
});

// updates profile in database
export const profileUpdateAction = (newProfile) => ({
  type: ACTION_PROFILE_UPDATE,
  payload: newProfile,
});
