import { useEffect, useRef, useState } from "react";
import { apiFetchAllPrograms } from "../../api/ProgramAPI";
import { apiFetchAllWorkouts } from "../../api/WorkoutAPI";
import { Calendar } from "react-calendar";
import { apiCreateUserGoal, apiGetCurrentGoal } from "../../api/GoalsAPI";
import keycloak from "../../Keycloak";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import AppContainer from "../../helpers/AppContainer";
const SetGoalPage = () => {
  const nav = useNavigate();

  // Variables holding all programs and workouts
  const [programs, setPrograms] = useState([]);
  const [workouts, setWorkouts] = useState([]);

  // Stores available workouts one can add to their goal (workouts not in selected program)
  const [availableWorkouts, setAvailableWorkouts] = useState([]);

  // End date variables
  const suggestedEndDate = new Date();
  const minDate = new Date();
  suggestedEndDate.setDate(suggestedEndDate.getDate() + 7);
  minDate.setDate(minDate.getDate() + 1);

  // Form variables
  const [formProgram, setFormProgram] = useState({});
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  const [endDate, setEndDate] = useState(suggestedEndDate);

  // Ref for workout selection input box
  const workoutSelection = useRef(null);

  const getPrograms = async () => {
    await apiFetchAllPrograms()
      .then((result) => result[1])
      .then((data) => {
        setPrograms(data);
      });
  };

  const getWorkouts = async () => {
    await apiFetchAllWorkouts()
      .then((response) => response[1])
      .then((data) => {
        setWorkouts(data);
        setAvailableWorkouts(data);
      });
  };

  const checkIfUserHasGoal = async () => {
    await apiGetCurrentGoal(keycloak.idTokenParsed.sub).then((response) => {
      if (!response[1].status && !(response[1].status === 404)) {
        // User has current goal, redirect to dashboard
        alert("You already have an active goal, so you cannot set a new one.");
        nav("/dashboard");
      }
    });
  };

  useEffect(() => {
    checkIfUserHasGoal();
    getPrograms();
    getWorkouts();
  }, []);

  useEffect(() => {
    // Reset selected workouts (state and select box) when available workouts changes
    setSelectedWorkouts([]);
    workoutSelection.current.setValue([]);
  }, [availableWorkouts]);

  const handleProgramSelect = (e) => {
    // Set selected program and updates additional workouts you can add to goal
    let selectedProgram = programs.find(
      (p) => p.id === parseInt(e.target.value)
    );
    setFormProgram(selectedProgram);
    let addableWorkouts = [];

    workouts.forEach((workout) => {
      if (!selectedProgram.workouts.includes(workout.id)) {
        addableWorkouts.push(workout);
      }
    });

    setAvailableWorkouts(addableWorkouts);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Object.keys(formProgram).length === 0) {
      alert("A goal must have a program");
      return;
    }

    let newGoal = {
      workouts: [...formProgram.workouts, ...selectedWorkouts],
      program: formProgram.id,
      endDate: endDate,
    };

    apiCreateUserGoal(newGoal, keycloak.idTokenParsed.sub).then((response) => {
      if (response[0]) {
        console.error(response[0]);
        alert(`Something went wrong: ${response[0]}`);
      } else {
        console.log(response[1]);
        nav("/dashboard");
      }
    });
  };

  let programList = programs.map((program) => {
    return (
      <div className={"form-check"}>
        <input
          type="radio"
          id={program.id}
          value={program.id}
          name="program"
          onClick={handleProgramSelect}
          className={"form-check-input"}
        />
        <label className={"form-check-label"}>{program.name}</label>
        <br />
      </div>
    );
  });

  // Options for select box
  const workoutOptions = availableWorkouts.map((workout) => {
    return { value: workout.id, label: workout.name };
  });

  let updateSelectedWorkouts = (workouts) => {
    // Updates selectedWorkouts with data in selection box

    let newWorkouts = [];

    workouts.forEach((w) => {
      let availableWorkout = availableWorkouts.find(
        (aw) => aw.id === parseInt(w.value)
      );

      if (availableWorkout) {
        newWorkouts = [...newWorkouts, availableWorkout];
      }
    });
    setSelectedWorkouts(newWorkouts.map((w) => w.id));
  };

  return (
    <AppContainer>
      <h1 className={"display-4"}>Set a new goal:</h1>
      <blockquote class={"blockquote"}>
        Set your next fitness goal! Choose a program as a base, and add extra
        workouts to your goal (optional).
      </blockquote>
      <form onSubmit={handleSubmit}>
        <div class={"form-group row mt-4"}>
          <legend class="col-form-label col-sm-2 pt-0">
            <p className={"lead"}>Base program for goal:</p>
          </legend>
          <div class="col-sm-10">
            {programList.length > 0 ? programList : "No programs"}
          </div>
        </div>

        <div class={"form-group row mt-4"}>
          <legend class="col-form-label col-sm-2 pt-0">
            <p className={"lead"}>Additional workouts:</p>
          </legend>
          <div class="col-sm-10">
            <div style={{ width: "50%" }}>
              <Select
                ref={workoutSelection}
                options={workoutOptions}
                isMulti
                onChange={updateSelectedWorkouts}
              />
            </div>
          </div>
        </div>

        <div class={"form-group row mt-4"}>
          <legend class="col-form-label col-sm-2 pt-0">
            <p className={"lead"}>Goal end date:</p>
          </legend>
          <div class="col-sm-10">
            <Calendar
              onClickDay={(newDate) => setEndDate(newDate)}
              value={endDate}
              minDate={minDate}
            />
          </div>
        </div>

        <div class="form-group row">
          <div class="col-sm-10">
            <button type="submit" value="Submit" class="btn btn-primary m-3">
              Set goal
            </button>
          </div>
        </div>
      </form>
    </AppContainer>
  );
};

export default SetGoalPage;
