import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import keycloak from "../../Keycloak";
import {
  profileFetchAction,
  profileUpdateAction,
} from "../../store/actions/profileActions";
import AppContainer from "../../helpers/AppContainer";

const ProfilePage = () => {
  // URL to manage account in Keycloak
  let accountURL = keycloak.createAccountUrl();

  // Redux state
  const user = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  // Form variables
  const [formWeight, setFormWeight] = useState(0);
  const [formHeight, setFormHeight] = useState(0);
  const [formMedicalConditions, setFromMedicalConditions] = useState("");
  const [formDisabilities, setFromDisabilities] = useState("");

  useEffect(() => {
    dispatch(profileFetchAction(keycloak.idTokenParsed.sub));
  }, []);

  useEffect(() => {
    // Update form default values with user details

    if (user.weight !== undefined) {
      setFormWeight(user.weight);
    }
    if (user.height !== undefined) {
      setFormHeight(user.height);
    }
    if (user.medicalConditions !== undefined) {
      setFromMedicalConditions(user.medicalConditions);
    }
    if (user.disabilities !== undefined) {
      setFromDisabilities(user.disabilities);
    }
  }, [user]);

  const bmi = (height, weight) => {
    // Returns calculated BMI along with BMI category
    let bmi = weight / ((height * height) / 10000);
    return { bmi: bmi.toFixed(1), cat: bmiCategory(bmi) };
  };

  const bmiCategory = (bmi) => {
    // determines bmi category based on bmi
    if (bmi < 18.5) return "underweight";
    else if (bmi < 24.9) return "normal weight";
    else if (bmi < 29.9) return "overweight";
    else return "obese";
  };

  const handleSubmit = (event) => {
    // updates new profile details in database
    event.preventDefault();

    let newProfile = {
      id: keycloak.idTokenParsed.sub,
      addressId: user.addressId,
      programId: user.programId,
      workoutId: user.workoutId,
      setId: user.setId,
      weight: formWeight,
      height: formHeight,
      medicalConditions: formMedicalConditions,
      disabilities: formDisabilities,
    };

    // Make request to backend and update redux state with result
    dispatch(profileUpdateAction(newProfile));
  };

  return (
    <AppContainer>
      <h1 className="display-4">Your fitness:</h1>

      <div className="form-group row mt-4">
          <label className="col-form-label col-sm-2 pt-0">
              <p className="lead">Weight:</p>
              </label>
          <div className="col-sm-10">
            <p>{user.weight? `${user.weight} kg` : "no weight recorded"}</p>
          </div>
        </div>
        <div className="form-group row mt-4">
          <label className="col-form-label col-sm-2 pt-0">
              <p className="lead">Height:</p>
              </label>
          <div className="col-sm-10">
            <p>{user.height? `${user.height} cm` : "no weight recorded"}</p>
          </div>
        </div>
        {user.weight !== undefined && user.height !== undefined && 
        <div className="form-group row mt-4">
        <label className="col-form-label col-sm-2 pt-0">
            <p className="lead">BMI:</p>
            </label>
        <div className="col-sm-10">
          <p>{bmi(user.height, user.weight).bmi} ({bmi(user.height, user.weight).cat})</p>
        </div>
      </div>
        }
        <div className="form-group row mt-4">
          <label className="col-form-label col-sm-2 pt-0">
              <p className="lead">Medical conditions:</p>
              </label>
          <div className="col-sm-10">
            <p>{user.medicalConditions? `${user.medicalConditions}` : "none"}</p>
          </div>
        </div>
        <div className="form-group row mt-4">
          <label className="col-form-label col-sm-2 pt-0">
              <p className="lead">Disabilities:</p>
              </label>
          <div className="col-sm-10">
            <p>{user.disabilities? `${user.disabilities}` : "none"}</p>
          </div>
        </div>


      <h1 className="display-4 mt-5">Update fitness details:</h1>

      <form onSubmit={handleSubmit}>
      <div className="form-group row mt-4">
          <label className="col-form-label col-sm-2 pt-0">
              <p className="lead">Weight (kg):</p>
              </label>
          <div className="col-sm-10">
            <input
              type="number"
              value={formWeight}
              onChange={(e) => setFormWeight(e.target.value)}
              className={"form-control"}
            />
          </div>
        </div>
        <div className="form-group row mt-4">
          <label className="col-form-label col-sm-2 pt-0">
              <p className="lead">Height (cm):</p>
              </label>
          <div className="col-sm-10">
            <input
              type="number"
              value={formHeight}
              onChange={(e) => setFormHeight(e.target.value)}
              className={"form-control"}
            />
          </div>
        </div>
        <div className="form-group row mt-4">
          <label className="col-form-label col-sm-2 pt-0">
          <p className="lead">Medical conditions:</p>
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              value={formMedicalConditions}
              onChange={(e) => setFromMedicalConditions(e.target.value)}
              className={"form-control"}
            />
          </div>
        </div>
        <div className="form-group row mt-4">
          <label className="col-form-label col-sm-2 pt-0">
          <p className="lead">Disabilities:</p>
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              value={formDisabilities}
              onChange={(e) => setFromDisabilities(e.target.value)}
              className={"form-control"}
            />
          </div>
        </div>
        <br />
        <button type="submit" value="Submit" className="btn btn-primary">Submit</button>
      </form>

      <h1 className="display-4 mt-5">Update account details:</h1>
      <button className="btn btn-secondary mt-3 mb-5" onClick={(e) => window.location.href = accountURL}>
        Manage account
      </button>
    </AppContainer>
  );
};

export default ProfilePage;
