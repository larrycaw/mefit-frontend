import { React, useState, useEffect } from "react";
import AppContainer from "../../helpers/AppContainer";
import {apiCreateProgram, apiFetchAllPrograms, apiUpdateProgram, apiAssignWorkout } from '../../api/ProgramAPI';
import { apiAssignSetByExercise, apiCreateWorkout, apiFetchAllWorkouts, apiUpdateWorkout } from '../../api/WorkoutAPI';


const AddWorkoutToProgram = () => {
    const [chosenProgram, setChosenProgram] = useState([])
    const [checked, setChecked] = useState([])
    const [programs, setPrograms] = useState([])
    const [workouts, setWorkouts] = useState([])


    const getAllWorkouts = async () => {
        await apiFetchAllWorkouts()
            .then(response => response[1])
            .then(data => setWorkouts(data))
    }

    const getAllPrograms = async () => {
        await apiFetchAllPrograms()
            .then(response => response[1])
            .then(data => setPrograms(data))
    }

    useEffect( () => {
        getAllPrograms()
        getAllWorkouts()
    },[])


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
    const handleCheck = (event) => {
        if(chosenProgram.id == null) {
            alert("Select a program")
        }
        else {
            apiAssignWorkout(chosenProgram.id, checked)
        }
        event.preventDefault()
    };

    const listInfo = (program) => {
        setChosenProgram(program)
    }

    return (
        <div>
            <h4>Add workout to selected program</h4>
            {programs.map((program, i) => <button key={i} onClick={() => listInfo(program)} className="btn btn-secondary" style={{background: '#7D9FE2', color: 'black' }}>{program.name}</button>)}
            <h3>Chosen Program: {chosenProgram.name}</h3>
            <h4>Edit Program</h4>
            <h6>Old name: {chosenProgram.name}</h6>
            <h6>Old category: {chosenProgram.category}</h6>

            <form onSubmit={handleCheck}>
                {workouts.map((workout, i) => (
                    <div key={i}>
                        <div  className="form-group col-md-5">
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="gridCheck" value={workout.id} onChange={handleChecked} />
                                <label className="form-check-label">
                                        {workout.name}
                                    </label>
                            </div>
                        </div>
                    </div>
                ))}
                <input type="submit" value="Submit" className="btn btn-primary"/>
            </form>
        </div>
    )

}

export default AddWorkoutToProgram