import { React, useEffect, useRef, useState } from 'react';
import keycloak from '../../Keycloak';
import { APIURL } from "../../API.js";
import { apiCreateWorkout, apiFetchAllWorkouts, apiUpdateWorkout } from '../../api/WorkoutAPI';
import { apiGetExercisesById, apiFetchAllExercises } from '../../api/ExerciseAPI';


const ContributorWorkoutPage = () => {
    const [exercises, setExercises] = useState([])
    const [workouts, setWorkouts] = useState([])
    const [workoutName, setName] = useState("")
    const [workoutType, setType] = useState("")
    const [chosenWorkout, setChosenWorkout] = useState([])
    const [chosenWorkoutName, setChosenWorkoutName] = useState("")
    const [chosenWorkoutType, setChosenWorkoutType] = useState("")
    const [chosenWorkoutCompleted, setChosenWorkoutCompleted] = useState(false)
    const [checked, setChecked] = useState([])


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

    const handleChangeName = (event) => {
        setName(event.target.value)
    }
    const handleChangeType = (event) => {
        setType(event.target.value)
    }

    const handleChangeNameEdit = (event) => {
        setChosenWorkoutName(event.target.value)
    }
    const handleChangeTypeEdit = (event) => {
        setChosenWorkoutType(event.target.value)
    }
    const handleChangeTypeCompleted = (event) => {
        setChosenWorkoutCompleted(event.target.checked)
    }

    const handleSubmit = (event) => {
        apiCreateWorkout(workoutName, workoutType)
        alert("A new workout is created")
        event.preventDefault()
    }

    const handleEdit = (event) => {
        apiUpdateWorkout(chosenWorkout.id, chosenWorkoutName, chosenWorkoutType, chosenWorkoutCompleted)
        alert(chosenWorkoutName + chosenWorkoutType + chosenWorkoutCompleted)
        event.preventDefault()
    }

    const handleChecked = (event) => {
        console.log(event.target.value)
    }
    const handleCheck = (event) => {

        console.log(exercises)
        var updatedList = [...checked];
        if (event.target.checked) {
            // updatedList = [...checked, event.target.value];
            updatedList.push(event.target.value)
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        console.log()
        setChecked(updatedList);
        event.preventDefault()
    };

    const listInfo = (workout) => {
        setChosenWorkout(workout)
    }

    return (
        <div>
            <h1 className="text-black text-4xl">Welcome to the Workout Contributor Page.</h1>
            <div>
                <h2>Create a new workout</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name of workout:
                        <input type="text" value={workoutName} onChange={handleChangeName}/>
                    </label>
                    <label>
                        Type of workout:
                        <input type="text" value={workoutType} onChange={handleChangeType}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
            <div>
                <h2>Choose a workout to edit</h2>
                {workouts.map((workout, i) => <button key={i} onClick={() => listInfo(workout)}>{workout.name}</button>)}
                <h3>Chosen workout: {chosenWorkout.name}</h3>
                <h4>Edit workout</h4>
                <form onSubmit={handleEdit}>
                    <label>
                        New name of workout:
                        <input type="text" value={chosenWorkoutName} onChange={handleChangeNameEdit}/>
                    </label>
                    <label>
                        New type of workout:
                        <input type="text" value={chosenWorkoutType} onChange={handleChangeTypeEdit}/>
                    </label>
                    <label>
                        Completed?
                        <input type="checkbox" value={chosenWorkoutCompleted} onChange={handleChangeTypeCompleted}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
            <div>
                <h4>Add exercise to selected workout</h4>

                <form onSubmit={handleCheck}>
                    {exercises.map((exercise, i) => (
                        <div key={i}>
                            <input type="checkbox" value={exercise.name} onChange={handleChecked}/>
                            <span>{exercise.name}</span>
                        </div>
                    ))}
                    <input type="submit" value="Submit" />
                </form>
                {checked}
            </div>
        </div>
    );
};

export default ContributorWorkoutPage;