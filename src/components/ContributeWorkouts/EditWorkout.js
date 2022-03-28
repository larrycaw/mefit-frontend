import { React, useState, useEffect } from "react";
import AppContainer from "../../helpers/AppContainer";
import { apiAssignSetByExercise, apiCreateWorkout, apiFetchAllWorkouts, apiUpdateWorkout, apiAssignSetToWorkout } from '../../api/WorkoutAPI';
import { apiGetExercisesById, apiFetchAllExercises } from '../../api/ExerciseAPI';


const EditWorkout = (props) => {
    
    const [chosenWorkoutName, setChosenWorkoutName] = useState("")
    const [chosenWorkoutType, setChosenWorkoutType] = useState("")
    const [chosenWorkout, setChosenWorkout] = useState([])
    const [workouts, setWorkouts] = useState([])
    const [exercises, setExercises] = useState([])

    
    
    const getAllWorkouts = async () => {
        await apiFetchAllWorkouts()
            .then(response => response[1])
            .then(data => setWorkouts(data))
    }

    const getAllExercises = async () => {
        await apiFetchAllExercises()
            .then(response => response[1])
            .then(data => setExercises(data))
    }

    useEffect( () => {
        getAllWorkouts()
        getAllExercises()
    },[])
    
    const handleChangeNameEdit = (event) => {
        setChosenWorkoutName(event.target.value)
    }
    const handleChangeTypeEdit = (event) => {
        setChosenWorkoutType(event.target.value)
    }



    const handleEdit = (event) => {
        if(chosenWorkoutName == "" && chosenWorkoutType == "") {
            alert("Insert edits")
        }
        else if (chosenWorkoutName != "" && chosenWorkoutType != "") {
            apiUpdateWorkout(chosenWorkout.id, chosenWorkoutName, chosenWorkoutType) 
            alert("Workout is edited")
        }
        else if(chosenWorkoutName == "" && chosenWorkoutType != "") {
            apiUpdateWorkout(chosenWorkout.id, chosenWorkout.name, chosenWorkoutType) 
            alert("Workout is edited")

        }
        else if(chosenWorkoutName != "" && chosenWorkoutType == "") {
            apiUpdateWorkout(chosenWorkout.id, chosenWorkoutName, chosenWorkout.type)  
            alert("Workout is edited")

        }
    }

    const listInfo = (workout) => {
        setChosenWorkout(workout)
    }

    return (
        <div>
            <h2>Choose a workout to edit</h2>
            {workouts.map((workout, i) => <button key={i} onClick={() => listInfo(workout)} className="btn btn-secondary" style={{background: '#7D9FE2', color: 'black' }}>{workout.name}</button>)}
            <h3>Chosen workout: {chosenWorkout.name}</h3>
            <h4>Edit workout</h4>
            <h6>Old name: {chosenWorkout.name}</h6>
            <h6>Old type: {chosenWorkout.type}</h6>

            <form onSubmit={handleEdit}>
                <div className="form-group col-md-5">
                    <label>
                        New name of workout:
                    </label>
                    <input type="text" value={chosenWorkoutName} onChange={handleChangeNameEdit} className="form-control" id="newName"/>
                </div>
                <div className="form-group col-md-5">
                    <label>
                        New type of workout:
                    </label>
                    <input type="text" value={chosenWorkoutType} onChange={handleChangeTypeEdit} className="form-control" id="newType"/>
                </div>
                <input type="submit" value="Submit" className="btn btn-primary"/>
            </form>
        </div>
    )
};

export default EditWorkout;