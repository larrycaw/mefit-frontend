import { React, useEffect, useRef, useState } from 'react';
import keycloak from '../../Keycloak';
import { API_URL } from "../../API.js";
import { apiFetchAllWorkouts, apiGetExercisesByWorkoutId } from '../../api/WorkoutAPI';
import { apiFetchAllSets, apiGetSetById } from '../../api/SetAPI';
import { apiGetExercisesById } from '../../api/ExerciseAPI';
import AppContainer from "../../helpers/AppContainer";


const Workout = () => {
    const [workouts, setWorkouts] = useState([])
    const [info, setInfo] = useState(["Click on a program for more info"])
    const [exercises, setExercises] = useState([])
    const [workoutId, setWorkoutId] = useState([])

    let wokroutIds = []
    let ex = []


    const getAllWorkouts = async () => {
        await apiFetchAllWorkouts()
            .then(response => response[1])
            .then(data =>{
                setWorkouts(data)
                data.forEach(element => {
                    wokroutIds.push(element.id)
                });
                wokroutIds.forEach(element => {
                    getExerciseInWorkout(element)
                });
            })
    }

    const getExerciseInWorkout = async (id) => {
        
        await apiGetExercisesByWorkoutId(id)
            .then(response => response[1])
            .then(data => {
                ex.push({"key": id, "value": data})
                setExercises(ex)
            })
    }

    useEffect( () => {
        getAllWorkouts()
    },[])


    const listInfo = async (event, workout) => {
        let workoutInfo = []
        workoutInfo.push(`Type: ${workout.type} ##`)
        workoutInfo.push(`Id: ${workout.id} ##`)

        exercises.forEach(exercise => {
            if(exercise.key == workout.id) {
                exercise.value.forEach(item => {
                    workoutInfo.push(`Exercise: Name: ${item.name}, Description ${item.description}, Targeted muscle group: ${item.targetMuscleGroup}  ##`)
                });
                
            }
        });
        setInfo(workoutInfo)          
        event.preventDefault()
    }

    return (
        <AppContainer>
            <h1 className="text-black text-4xl">Welcome to the Workout Page.</h1>
            <h2>All registered workouts:</h2>
            {workouts.map((workout, i) => <button key={i} onClick={(event) => listInfo(event, workout)}>{workout.name}</button>)}
            <div>
                {info}
            </div>
        </AppContainer>
    );
};

export default Workout;