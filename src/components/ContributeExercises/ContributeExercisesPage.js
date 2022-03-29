import { useEffect, useState } from "react";
import ExerciseForm from "./ExerciseForm";
import { apiFetchAllExercises } from '../../api/ExerciseAPI';
import AppContainer from "../../helpers/AppContainer";

const ContributeExercisesPage = () => {

    const [exercises, setExercises] = useState([])
    const [selectedExercise, selectExercise] = useState({})

    // Get all registered exercises
    const getAllExercises = async () => {
        await apiFetchAllExercises()
            .then(response => response[1])
            .then(data => setExercises(data))
    }

    useEffect(() => {
        getAllExercises();
    },[])

    // Handle selected exercise to show info
    const onSelect = (e) => {
        let exerciseId = parseInt(e.target.value)
        selectExercise(exercises.find((e) => e.id === exerciseId))
    }

    return (
        <AppContainer>
            <div style={{marginTop: '100px'}}>
                <h1 className="text-black text-4xl">Create new exercise:</h1>
                
                    <ExerciseForm getNewExercises={getAllExercises}/>
                    <h1 className="text-black text-4xl">Update existing exercise</h1>
                    <select onChange={onSelect} defaultValue="">
                    <option key="default" value="" disabled>Select exercise</option>
                        {exercises.map((exercise) => {return (<option key={exercise.id} value={exercise.id}>{exercise.name}</option>);})}
                    </select>
                    {selectedExercise.id? <ExerciseForm exercise={selectedExercise}  getNewExercises={getAllExercises}/> : <></>}
            </div>
            
        </AppContainer>
    )
};

export default ContributeExercisesPage;
