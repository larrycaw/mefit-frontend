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

    return <>
    contribute!
    <h1>Create new exercise:</h1>
    <ExerciseForm/>
    <h1>Update existing exercise</h1>
    {selectedExercise.name}
    <select onChange={(e) => selectExercise(e.target.value)}>
    <option key="default" value="" disabled selected>Select exercise</option>
        {exercises.map((exercise) => {return (<option key={exercise.id} value={exercise}>{exercise.name}</option>);})}
    </select>
    <ExerciseForm exercise={selectedExercise}/>
    </>
};

export default ContributeExercisesPage;
