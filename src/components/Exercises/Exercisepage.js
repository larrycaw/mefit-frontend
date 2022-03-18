import { React, useEffect, useRef, useState } from 'react';
import keycloak from '../../Keycloak';
import { API_URL } from "../../API.js";
import { apiFetchAllSets, apiGetSetById } from '../../api/SetAPI';
import { apiGetExercisesById, apiFetchAllExercises } from '../../api/ExerciseAPI';


const ExercisePage = () => {
    const [info, setInfo] = useState(["Click on a exercise for more info"])
    const [exercises, setExercises] = useState([])



    const getAllExercises = async () => {
        await apiFetchAllExercises()
            .then(response => response[1])
            .then(data => setExercises(data))
    }

    useEffect( () => {
        getAllExercises()
    },[])


    const listInfo = (exercise) => {
        let exerciseInfo = []
        exerciseInfo.push(`Name: ${exercise.name}, Description: ${exercise.description}, Target Muscle Group: ${exercise.targetMuscleGroup}`)

        setInfo(exerciseInfo)

    }

    return (
        <div>
            <h1 className="text-black text-4xl">Welcome to the Workout Page.</h1>
            <h2>All registered exercises:</h2>
            {exercises.map((exercise, i) => <button key={i} onClick={() => listInfo(exercise)}>{exercise.name}</button>)}
            <div>
                {info}
            </div>
        </div>
    );
};

export default ExercisePage;