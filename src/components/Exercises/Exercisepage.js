import { React, useEffect, useRef, useState } from 'react';
import keycloak from '../../Keycloak';
import { API_URL } from "../../API.js";
import { apiFetchAllSets, apiGetSetById } from '../../api/SetAPI';
import { apiGetExercisesById, apiFetchAllExercises } from '../../api/ExerciseAPI';
import AppContainer from '../../helpers/AppContainer';


const ExercisePage = () => {
    const [info, setInfo] = useState([""])
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
        exerciseInfo.push(`Name: ${exercise.name}`)
        exerciseInfo.push(`Description: ${exercise.description}`)
        exerciseInfo.push(`Target Muscle Group: ${exercise.targetMuscleGroup}`)

        setInfo(exerciseInfo)

    }

    return (
        <AppContainer>
            <h1 className="text-black text-4xl">Welcome to the Workout Page.</h1>
            <AppContainer>
                <h2>All registered exercises:</h2>
                <div class="row">
                    <div class="col-4">
                        <div class="list-group" id="list-tab" role="tablist" >
                            {exercises.map((exercise, i) =>
                                <a class="list-group-item list-group-item-action" style={{background: '#7D9FE2'}} data-toggle="list" role="tab" onClick={() => listInfo(exercise)}>{exercise.name}</a>
                            )}

                        </div>
                    </div>
                    <div class="col-8">
                        <div class="tab-content" id='nav-tabContent'>
                            {info.map((inf, i) => 
                                <div className='tab-pane fade show active'>
                                    {inf}
                                </div>
                            )}

                        </div>
                    </div>

                </div>
            </AppContainer>
        </AppContainer>
    );
};

export default ExercisePage;