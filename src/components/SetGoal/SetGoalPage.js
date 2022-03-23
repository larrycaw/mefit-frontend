import { useEffect, useState } from "react";
import { apiFetchAllExercises } from "../../api/ExerciseAPI";
import { apiFetchAllPrograms } from "../../api/ProgramAPI";
import { apiFetchAllWorkouts } from "../../api/WorkoutAPI";
import { Calendar } from "react-calendar";
import { apiCreateUserGoal } from "../../api/GoalsAPI";
import keycloak from "../../Keycloak";

const SetGoalPage = () => {

    // Variables holding all programs and workouts
    const [programs, setPrograms] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    
    // End date variables
    const suggestedEndDate = new Date();
    suggestedEndDate.setDate(suggestedEndDate.getDate() + 7);

    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 1);

    // Form input
    const [formProgram, setFormProgram] = useState({});
    const [endDate, setEndDate] = useState(suggestedEndDate);

    const getPrograms = async () => {
        await apiFetchAllPrograms()
        .then (result => result[1])
        .then((data) => {
          setPrograms(data);
        })
    }

    const getWorkouts = async () => {
        await apiFetchAllWorkouts()
            .then(response => response[1])
            .then(data => { 
                setWorkouts(data.map((w) => ({workout: w, checked: false})))
            })
    }

    useEffect(() => {
        getPrograms();
        getWorkouts();
    }, [])

    const handleWorkoutClick = (e) => {
        // Updates workout object to reflect that a workout is checked
        let checkedWorkout = workouts.find(w => w["workout"].id === parseInt(e.target.value));
        checkedWorkout["checked"] = !checkedWorkout["checked"]
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (Object.keys(formProgram).length === 0){
            alert("A goal must have a program")
            return;
        }

        let newGoal = {
            workouts: workouts.filter(w => w["checked"] === true).map(w => w["workout"].id),
            program: formProgram.id,
            endDate: endDate
        }

        apiCreateUserGoal(newGoal, keycloak.idTokenParsed.sub)
        .then ((response) => {
            if (response[0]){
                console.log(response[0])
            }
            else {
                console.log("success")
            }
        })
    }

    let programList = programs.map((program) => {
        return(<>
            <input type="radio" id={program.id} value={program.id} name="program" onChange={(e) => setFormProgram(programs.find(p => p.id === parseInt(e.target.value)))} />
            <label>{program.name}</label>
            <br/>
            </>
        )
    })

    let workoutList = workouts.map((workout) => {
        return(<>
            <input type="checkbox" id={workout["workout"].id} value={workout["workout"].id} defaultChecked={workout["checked"]} onClick={handleWorkoutClick}/>
            <label>{workout["workout"].name}</label>
            <br/>
            </>
        )
    })

  return (<>
  <form onSubmit={handleSubmit}>
      <h1>Set a new goal:</h1>
    <div>
        <h3>Select programs to add to goal:</h3> 
        {programList.length > 0 ? programList : "No programs"}
    </div>
    <div>
        <h3>Select workouts to add to goal:</h3>
        {workoutList.length > 0 ? workoutList : "No workouts"}
    </div>
    <div>
        <h3>Set goal end date:</h3>
        <Calendar onClickDay={(newDate) => setEndDate(newDate)} value={endDate} minDate={minDate} />
    </div>
    <button type="submit" value="Submit">Set goal</button>
  </form>
  </>);
};

export default SetGoalPage;
