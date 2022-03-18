import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import keycloak from "../../Keycloak";
import { profileFetchAction, profileUpdateAction } from "../../store/actions/profileActions";


const UpdateProfilePage = () => {
    let accountURL = keycloak.createAccountUrl();
    const user = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const [formWeight, setFormWeight] = useState(0);
    const [formHeight, setFormHeight] = useState(0);
    const [formMedicalConditions, setFromMedicalConditions] = useState("");
    const [formDisabilities, setFromDisabilities] = useState("");

    
    useEffect(() => {
        dispatch(profileFetchAction(keycloak.idTokenParsed.sub));
    }, []);

    useEffect(() => {
        if (user.weight !== undefined){
            setFormWeight(user.weight)
        }
        if (user.height !== undefined){
            setFormHeight(user.height)
        }
        if (user.medicalConditions !== undefined){
            setFromMedicalConditions(user.medicalConditions)
        }
        if (user.disabilities !== undefined){
            setFromDisabilities(user.disabilities)
        }
    }, [user]);

    const bmi = (height, weight) => {
        // returns calculated BMI along with BMI category
        let bmi = weight / (height * height / 10000)
        return {bmi: bmi.toFixed(1), cat: bmiCategory(bmi)};
    }

    const bmiCategory = (bmi) => {
        if (bmi < 18.5)
            return "underweight"
        
        else if (bmi < 24.9)
            return "normal weight"
        
        else if (bmi < 29.9)
            return "overweight"
        
        else
            return "obese"
    }

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
            disabilities: formDisabilities
        }
        dispatch(profileUpdateAction(newProfile))
    }

  return <>
  <h1>Your fitness:</h1>
  <div>Weight: {user.weight? <span>{user.weight} kg</span>: <span>no weight recorded</span>}</div>
  <div>Height: {user.height? <span>{user.height} cm</span> : <span>no height recorded</span>}</div>
  {user.weight && user.height ? <div>BMI: {bmi(user.height, user.weight).bmi} ({bmi(user.height, user.weight).cat})</div> : <br/>}
  <div>Medical conditions: {user.medicalConditions? user.medicalConditions : <span>none</span>}</div>
  <div>Disabilities: {user.disabilities? user.disabilities : <span>none</span>}</div>
  <br/>
  <h1>Update fitness details:</h1>
  <form onSubmit={handleSubmit}>
      <label>
          Weight:
          <input type="number" value={formWeight} onChange={(e) => setFormWeight(e.target.value)}/>
      </label>
        <br/>
      <label>
          Height:
          <input type="number" value={formHeight} onChange={(e) => setFormHeight(e.target.value)}/>
      </label>
      <br/>
      <label>
          Medical conditions:
          <input type="text" value={formMedicalConditions} onChange={(e) => setFromMedicalConditions(e.target.value)}/>
      </label>
      <br/>
      <label>
          Disabilities:
          <input type="text" value={formDisabilities} onChange={(e) => setFromDisabilities(e.target.value)}/>
      </label>
      <br/>
    <input type="submit" value="Submit" />
  </form>
  <h1>Update account details:</h1>
  <button><a href={accountURL}>Manage account</a></button>
  </>;
};

export default UpdateProfilePage;
