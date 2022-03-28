import { React, useState, useEffect } from "react";
import AppContainer from "../../helpers/AppContainer";
import { apiAssignSetByExercise, apiCreateWorkout, apiFetchAllWorkouts, apiUpdateWorkout, apiAssignSetToWorkout } from '../../api/WorkoutAPI';
import { apiGetExercisesById, apiFetchAllExercises } from '../../api/ExerciseAPI';
import { apiCreateSet } from '../../api/SetAPI'


const AddSetWorkout = (props) => {
    const [chosenWorkout, setChosenWorkout] = useState([])
    const [workouts, setWorkouts] = useState([])
    const [exercises, setExercises] = useState([])
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

    useEffect(() => {
        if(createdSets.length > 0 ) {
            handleAssign(createdSets)
            alert("Exercises har added to workout")
        }

        
    }, [createdSets])
    
    const listInfo = (workout) => {
        setChosenWorkout(workout)
    }

    const handleRepetitions = (event, exercise) => {
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
        await apiCreateSet(key, value)
            .then(response => response[1])
            .then(data => {
                newSetList.push(data.id)
                console.log("in handle create set ", newSetList)
                setCreatedSets(newSetList)
            })
    }
    const handleAssign = async (set) => {
        console.log("in  handle assign")
        apiAssignSetToWorkout(chosenWorkout.id, set)
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
                    }
                });
            });
        }
        event.preventDefault()
    };

    return (
        <div>
            <h4>Add exercise to selected workout with number of repetitions</h4>
            {workouts.map((workout, i) => <button key={i} onClick={() => listInfo(workout)} className="btn btn-secondary" style={{background: '#7D9FE2', color: 'black' }}>{workout.name}</button>)}
            <h3>Chosen workout: {chosenWorkout.name}</h3>
            <form onSubmit={handleCheck}>
                {exercises.map((exercise, i) => (
                    <div key={i}>
                        <div className="form-group col-md-5">
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="gridCheck" value={exercise.id} onChange={handleChecked}/>
                                <label className="form-check-label">
                                    {exercise.name}
                                </label>
                                <div>
                                    <label>
                                        Number of repetitions
                                    </label>
                                    <input type="number" className="form-control" min={1} onClick={(e) => handleRepetitions(e, exercise)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <input type="submit" value="Submit" className="btn btn-primary"/>
            </form>
        </div>
    )
};

export default AddSetWorkout;