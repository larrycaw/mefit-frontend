import { React, useEffect, useState } from "react";
import { APIURL } from "../API.js";
import { useDispatch, useSelector } from "react-redux";
import {
  profileFetchAction,
  profileUpdateAction,
} from "../store/actions/profileActions.js";

const Home = () => {
  const user = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  // for testing purposes only. ID should be fetched from keycloak instead.
  const currentUserId = "keycloak-uidd";

  // Fetches/creates profile for user.
  const checkCurrentUser = (userId) => {
    dispatch(profileFetchAction(userId));
  };

  // test function for updating profile in database
  const updateUserInDB = () => {
    let newData = {
      id: currentUserId,
      weight: 60,
      height: 171,
      medicalConditions: "Anxiety",
      disabilities: "kakklxamkm",
      addressId: 1,
      programId: 2,
      workoutId: 1,
      setId: 1,
    };

    dispatch(profileUpdateAction(newData));
  };

  useEffect(() => {
    // Check current user's profile on mount
    checkCurrentUser(currentUserId);
  }, []);

  return (
    <div>
      <h1 className="text-green-800 text-4xl">Welcome to the Homepage</h1>
      <button onClick={updateUserInDB}>update user in db</button>
      <h4>current user disabilities is {user ? user.disabilities : ""}</h4>
    </div>
  );
};

export default Home;
