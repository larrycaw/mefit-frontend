import { React, useEffect, useRef, useState } from 'react';
import keycloak from '../../Keycloak';
import { APIURL } from "../../API.js";
import { apiFetchAllWorkouts, apiGetExercisesByWorkoutId } from '../../api/WorkoutAPI';
import { apiFetchAllSets, apiGetSetById } from '../../api/SetAPI';
import { apiGetExercisesById } from '../../api/ExerciseAPI';


const Workout = () => {
    const [workouts, setWorkouts] = useState([])
    const [info, setInfo] = useState(["Click on a program for more info"])
    const [exercises, setExercises] = useState([])



    const getAllWorkouts = async () => {
        await apiFetchAllWorkouts()
            .then(response => response[1])
            .then(data => setWorkouts(data))
    }

    const getExerciseInWorkout = async (id) => {
        await apiGetExercisesByWorkoutId(id)
            .then(response => response[1])
            .then(data => setExercises(data))
    }


    useEffect( () => {
        getAllWorkouts()
    },[])


    const listInfo = (workout) => {
        let workoutInfo = []
        workoutInfo.push(`Type: ${workout.type} ##`)

        getExerciseInWorkout(workout.id)
        exercises.forEach(exercise => {
            console.log(exercise)
            workoutInfo.push(`Exercise: Name: ${exercise.name}, Description ${exercise.description}, Targeted muscle group: ${exercise.targetMuscleGroup}  ##`)

        });

        setInfo(workoutInfo)
    }

    return (
        <div>
            <h1 className="text-black text-4xl">Welcome to the Workout Page.</h1>
            <h2>All registered workouts:</h2>
            {workouts.map((workout, i) => <button key={i} onClick={() => listInfo(workout)}>{workout.name}</button>)}
            <div>
                {info}
            </div>
            
        </div>
    );
};

export default Workout;