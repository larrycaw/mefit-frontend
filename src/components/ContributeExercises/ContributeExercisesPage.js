import { useEffect, useState } from "react";
import ExerciseForm from "./ExerciseForm";
import { apiFetchAllExercises } from '../../api/ExerciseAPI';

const ContributeExercisesPage = () => {

    const [exercises, setExercises] = useState([])
    const [selectedExercise, selectExercise] = useState({})

    const getAllExercises = async () => {
        await apiFetchAllExercises()
            .then(response => response[1])
            .then(data => setExercises(data))
    }

    useEffect(() => {
        getAllExercises();
    },[])

    const onSelect = (e) => {
        let exerciseId = parseInt(e.target.value)
        selectExercise(exercises.find((e) => e.id === exerciseId))
    }

    return <>
    contribute!
    <h1>Create new exercise:</h1>
    <ExerciseForm getNewExercises={getAllExercises}/>
    <h1>Update existing exercise</h1>
    <select onChange={onSelect} defaultValue="">
    <option key="default" value="" disabled>Select exercise</option>
        {exercises.map((exercise) => {return (<option key={exercise.id} value={exercise.id}>{exercise.name}</option>);})}
    </select>
    {selectedExercise.id? <ExerciseForm exercise={selectedExercise}  getNewExercises={getAllExercises}/> : <></>}
    </>
};

export default ContributeExercisesPage;
