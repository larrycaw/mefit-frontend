import { useEffect, useState } from "react";
import { apiFetchAllExercises } from "../../api/ExerciseAPI";
import { apiFetchAllPrograms } from "../../api/ProgramAPI";
import { apiFetchAllWorkouts } from "../../api/WorkoutAPI";
import { Calendar } from "react-calendar";

const SetGoalPage = () => {

    // Variables holding all programs, exercises and workouts
    const [programs, setPrograms] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [workouts, setWorkouts] = useState([]);

    // Form input
    const [formPrograms, setFormPrograms] = useState([]);
    const [date, setDate] = useState(new Date());

    const getPrograms = async () => {
        await apiFetchAllPrograms()
        .then (result => result[1])
        .then((data) => {
          setPrograms(data);
        })
    }

    const getExercises = async () => {
        await apiFetchAllExercises()
            .then(response => response[1])
            .then(data => setExercises(data))
    }

    const getWorkouts = async () => {
        await apiFetchAllWorkouts()
            .then(response => response[1])
            .then(data => setWorkouts(data))
    }

    useEffect(() => {
        getPrograms();
        getExercises();
        getWorkouts();
    }, [])

    let programList = programs.map((program) => {
        return(<>
            <input type="checkbox" id={program.id} value={program.id} />
            <label>{program.name}</label>
            <br/>
            </>
        )
    })

    let exerciseList = exercises.map((exercise) => {
        return(<>
            <input type="checkbox" id={exercise.id} value={exercise.id} />
            <label>{exercise.name}</label>
            <br/>
            </>
        )
    })

    let workoutList = workouts.map((workout) => {
        return(<>
            <input type="checkbox" id={workout.id} value={workout.id} />
            <label>{workout.name}</label>
            <br/>
            </>
        )
    })

  return (<>
  <form>
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
        <h3>Select exercises to add to goal:</h3>
        {exerciseList.length > 0 ? exerciseList : "No exercises"}
    </div>
    <div>
        <h3>Set goal end date:</h3>
        <Calendar onClickDay={(newDate) => setDate(newDate)} value={new Date()} />
    </div>
    <button>Submit</button>
  </form>
  Date: {date? date.toJSON() : "no date"}
  </>);
};

export default SetGoalPage;
