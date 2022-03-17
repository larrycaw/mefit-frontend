import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { profileMiddleware } from "./middleware/profileMiddleware";
import { profileReducer } from "./reducers/profileReducer";

const appReducers = combineReducers({
  profile: profileReducer,
});

export default createStore(
  appReducers,
  composeWithDevTools(applyMiddleware(profileMiddleware))
);
