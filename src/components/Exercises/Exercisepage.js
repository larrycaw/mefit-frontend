import { React, useEffect,useState } from 'react';
import { apiFetchAllExercises } from '../../api/ExerciseAPI';
import AppContainer from '../../helpers/AppContainer';


const ExercisePage = () => {
    const [info, setInfo] = useState([""])
    const [exercises, setExercises] = useState([])

    // Get all exercise
    const getAllExercises = async () => {
        await apiFetchAllExercises()
            .then(response => response[1])
            .then(data => setExercises(data))
    }

    useEffect( () => {
        getAllExercises()
    },[])

    // List of info for selected exercises
    const listInfo = (exercise) => {
        let exerciseInfo = []
        exerciseInfo.push(`Name: ${exercise.name}`)
        exerciseInfo.push(`Description: ${exercise.description}`)
        exerciseInfo.push(`Target Muscle Group: ${exercise.targetMuscleGroup}`)

        setInfo(exerciseInfo)

    }

    return (
        <AppContainer>
            <h1 className="text-black text-4xl">Welcome to the Exercise Page.</h1>
            <AppContainer>
                <h2>All registered exercises:</h2>
                <div className="row">
                    <div className="col-4">
                        <div className="list-group" id="list-tab" role="tablist" >
                            {exercises.map((exercise, i) =>
                                <a className="list-group-item list-group-item-action" style={{background: '#7D9FE2'}} data-toggle="list" role="tab" onClick={() => listInfo(exercise)}>{exercise.name}</a>
                            )}

                        </div>
                    </div>
                    <div className="col-8">
                        <div className="tab-content" id='nav-tabContent'>
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