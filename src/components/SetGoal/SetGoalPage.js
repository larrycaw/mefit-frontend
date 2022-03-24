import { useEffect, useState } from "react";
import { apiFetchAllExercises } from "../../api/ExerciseAPI";
import { apiFetchAllPrograms } from "../../api/ProgramAPI";
import { apiFetchAllWorkouts } from "../../api/WorkoutAPI";
import { Calendar } from "react-calendar";
import { apiCreateUserGoal } from "../../api/GoalsAPI";
import keycloak from "../../Keycloak";
import WorkoutCheckboxForm from "./WorkoutCheckboxForm";

const SetGoalPage = () => {
  // Variables holding all programs and workouts
  const [programs, setPrograms] = useState([]);
  const [workouts, setWorkouts] = useState([]);

  // End date variables
  const suggestedEndDate = new Date();
  suggestedEndDate.setDate(suggestedEndDate.getDate() + 7);

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

  // Form variables
  const [formProgram, setFormProgram] = useState({});
  const [availableWorkouts, setAvailableWorkouts] = useState([]);
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  const [endDate, setEndDate] = useState(suggestedEndDate);
  // const [workoutList, setWorkoutList] = useState(<></>);

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

  useEffect(() => {
    // TODO: CHECK IF USER HAS CURRENT GOAL
    getPrograms();
    getWorkouts();
  }, []);

  const handleWorkoutClick = (e) => {
    // Updates workout object to reflect that a workout is checked
    console.log(`id: ${e.target.id}`)
    console.log(`checked: ${e.target.checked}`)
    // let newFormWorkouts = formWorkouts;
    // let test = newFormWorkouts.find(
    //   (w) => w["workout"].id === parseInt(e.target.id)
    // );
    // test["checked"] = e.target.checked;
    // setFormWorkouts(newFormWorkouts);


    // let newFormWorkouts = [];

    // formWorkouts.forEach((workout) => {
    //   if (workout["workout"].id === parseInt(e.target.id)) {
    //     availableWorkouts.push(workout);
    //   }
    // });
    // // CHECKED DOES NOT GET UPDATED ON SELECTING NEW PROGRAM
    // setFormWorkouts(
    //   availableWorkouts.map((w) => ({ workout: w, checked: false }))
    // );
  };

  const handleProgramSelect = (e) => {
    // set selected program and update additional workouts you can add
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
    // CHECKED DOES NOT GET UPDATED ON SELECTING NEW PROGRAM
    setAvailableWorkouts(addableWorkouts);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TO DO FIX

    if (Object.keys(formProgram).length === 0) {
      alert("A goal must have a program");
      return;
    }

    let newGoal = {
      workouts: selectedWorkouts
        .map((w) => w.id),
      program: formProgram.id,
      endDate: endDate,
    };

    console.log(newGoal);

    // apiCreateUserGoal(newGoal, keycloak.idTokenParsed.sub)
    // .then ((response) => {
    //     if (response[0]){
    //         console.log(response[0])
    //     }
    //     else {
    //         console.log("success")
    //     }
    // })
  };

  let workoutList = availableWorkouts.map((workout) => {
    return (
      <>
        <input
          type="checkbox"
          id={workout.id}
          value={workout.id}
          defaultChecked={false}
          onChange={handleWorkoutClick}
        />
        <label>
          {workout.name}
        </label>
        <br />
      </>
    );
  });

  let programList = programs.map((program) => {
    return (
      <>
        <input type="radio"
          id={program.id}
          value={program.id}
          name="program"
          onClick={handleProgramSelect}
        />
        <label>{program.name}</label>
        <br />
      </>
    );
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Set a new goal:</h1>
        <div>
          <h3>Select programs to add to goal:</h3>
          {programList.length > 0 ? programList : "No programs"}
        </div>
        <div>
          <h3>Select additional workouts to add to goal:</h3>
          {availableWorkouts.length > 0 ? workoutList : "No workouts"}
        </div>
        <div>
          <h3>Set goal end date:</h3>
          <Calendar
            onClickDay={(newDate) => setEndDate(newDate)}
            value={endDate}
            minDate={minDate}
          />
        </div>
        <button type="submit" value="Submit">
          Set goal
        </button>
      </form>
    </>
  );
};

export default SetGoalPage;
