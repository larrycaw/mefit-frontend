import { React, useEffect, useState } from 'react';
import { apiFetchAllWorkouts, apiGetExercisesByWorkoutId } from '../../api/WorkoutAPI';
import AppContainer from "../../helpers/AppContainer";


const Workout = () => {
    const [workouts, setWorkouts] = useState([])
    const [info, setInfo] = useState([""])
    const [exercises, setExercises] = useState([])
    const [workoutId, setWorkoutId] = useState([])

    let workoutIds = []
    let ex = []

    // Get all registered workouts
    const getAllWorkouts = async () => {
        await apiFetchAllWorkouts()
            .then(response => response[1])
            .then(data =>{
                setWorkouts(data)
                data.forEach(element => {
                    workoutIds.push(element.id)
                });
                workoutIds.forEach(element => {
                    getExerciseInWorkout(element)
                });
            })
    }

    // Get all exercises registered to current workout
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

    // Handle info about the workout and ita exercises
    const listInfo = async (event, workout) => {
        let workoutInfo = []
        workoutInfo.push(`Name: ${workout.name}`)
        workoutInfo.push(`Type: ${workout.type}`)

        exercises.forEach(exercise => {
            if(exercise.key == workout.id) {
                exercise.value.forEach(item => {
                    workoutInfo.push(`####`)
                    workoutInfo.push("Exercise:")
                    workoutInfo.push(`Name: ${item.name}`)
                    workoutInfo.push(`Description ${item.description}`)
                    workoutInfo.push(`Targeted muscle group: ${item.targetMuscleGroup}`)
                });
                
            }
        });
        setInfo(workoutInfo)          
        event.preventDefault()
    }

    return (
        <AppContainer>
            <h1 className="text-black text-4xl">Welcome to the Workout Page.</h1>
            <AppContainer>
                <h2>All registered workouts:</h2>
                <div className="row">
                    <div className="col-4">
                        <div className="list-group" id="list-tab" role="tablist" >
                            {workouts.map((workout, i) => 
                                <a className="list-group-item list-group-item-action" style={{background: '#7D9FE2'}} data-toggle="list" role="tab" onClick={(event) => listInfo(event, workout)}>{workout.name}</a>
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

export default Workout;