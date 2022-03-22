import { React, useEffect, useRef, useState } from 'react';
import keycloak from '../../Keycloak';
import { APIURL } from "../../API.js";
import { apiAssignSetByExercise, apiCreateWorkout, apiFetchAllWorkouts, apiUpdateWorkout, apiAssignSetToWorkout } from '../../api/WorkoutAPI';
import { apiGetExercisesById, apiFetchAllExercises } from '../../api/ExerciseAPI';
import { apiCreateSet } from '../../api/SetAPI'


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
    const [newSets, setNewSets] = useState([])
    const [createdSets, setCreatedSets] = useState([])

    let newSetList = []

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
        // event.preventDefault()
    }

    const handleEdit = (event) => {
        apiUpdateWorkout(chosenWorkout.id, chosenWorkoutName, chosenWorkoutType, chosenWorkoutCompleted)
        alert(chosenWorkoutName + chosenWorkoutType + chosenWorkoutCompleted)
        event.preventDefault()
    }

    const handleChecked = (event) => {

        var updateList = [...checked]
        const exists = updateList.some(v => (v == event.target.value))
        if(exists == false) {
            updateList.push(parseInt(event.target.value))
            setChecked(updateList);
        }
        else {
            setChecked(v => v.filter((item) => item != event.target.value))
        }
    }

    const handleCreateSet = async (key, value) => {
        let updateCreatedSets = [...createdSets]
        await apiCreateSet(key, value)
            .then(response => response[1])
            .then(data => {
                // console.log(data.id)
                // updateCreatedSets.push(data.id)
                newSetList.push(data.id)
                setCreatedSets(newSetList)
            })
            // .then(data => setCreatedSets(updateCreatedSets))
    }

    const handleCheck = (event) => {
        if(chosenWorkout.id == null) {
            alert("Select a workout")
        }
        else {
            newSets.forEach(element => {
                checked.forEach(check => {
                    if(check == element.key) {
                        handleCreateSet(element.key, element.value)
                        // apiCreateSet(element.key, element.value)

                    }
                });
            });
            console.log(createdSets)  
            // console.log(newSetList)
            // setCreatedSets(newSetList)
            
        
            apiAssignSetToWorkout(chosenWorkout.id, createdSets)
        }
        event.preventDefault()
    };

    const listInfo = (workout) => {
        setChosenWorkout(workout)
    }

    const handleRepetitions = (event, exercise) => {
        // console.log(event.target.value)
        // console.log(exercise.name)

        var updateNewSets = [...newSets]
        const exists = updateNewSets.some(v => (v.key == exercise.id))

        if(exists == false) {
            var newSet = {"key": exercise.id, "value": event.target.value}
            updateNewSets.push(newSet)
            setNewSets(updateNewSets)
        }
        else {
            updateNewSets.forEach(element => {
                if(element.key == exercise.id) {
                    element.value = event.target.value
                }
            });
        }

        // console.log(newSets)
        event.preventDefault()

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
                <h4>Add exercise to selected workout with number of repetitions</h4>
                <form onSubmit={handleCheck}>
                    {exercises.map((exercise, i) => (
                        <div key={i}>
                            <input type="checkbox" value={exercise.id} onChange={handleChecked}/>
                            <span>{exercise.name}</span>
                            <div>
                                Number of repetitions
                                <input type="number" min={1} onClick={(e) => handleRepetitions(e, exercise)}/>
                            </div>
                        </div>
                    ))}
                    <input type="submit" value="Submit" />
                </form>
                {checked}
                {createdSets}
            </div>
        </div>
    );
};

export default ContributorWorkoutPage;