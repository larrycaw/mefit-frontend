import { React, useEffect, useRef, useState } from 'react';
import keycloak from '../../Keycloak';
import { APIURL } from "../../API.js";
import { apiAssignSetByExercise, apiCreateWorkout, apiFetchAllWorkouts, apiUpdateWorkout } from '../../api/WorkoutAPI';
import { apiCreateProgram } from '../../api/ProgramAPI';
import { apiFetchAllPrograms, apiUpdateProgram, apiAssignWorkout } from '../../api/ProgramAPI';


const ContributorProgramPage = () => {
    const [programs, setPrograms] = useState([])
    const [workouts, setWorkouts] = useState([])
    const [category, setCategory] = useState("")
    const [programName, setName] = useState("")
    const [chosenProgram, setChosenProgram] = useState([])
    const [chosenProgramName, setChosenProgramName] = useState("")
    const [chosenProgramCategory, setChosenProgramCategory] = useState("")
    const [checked, setChecked] = useState([])




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

    const handleChangeName = (event) => {
        setName(event.target.value)
    }
    const handleChangeCategory = (event) => {
        setCategory(event.target.value)
    }


    const handleSubmit = (event) => {
        apiCreateProgram(programName, category)
        alert("A new program is created")
        event.preventDefault()
    }

    
    const handleEdit = (event) => {
        apiUpdateProgram(chosenProgram.id, chosenProgramName, chosenProgramCategory)
        alert(chosenProgramName + ' ' + chosenProgramCategory)
        event.preventDefault()
    }

    const listInfo = (program) => {
        setChosenProgram(program)
    }

    const handleChangeNameEdit = (event) => {
        setChosenProgramName(event.target.value)
    }
    
    const handleChangeCategoryEdit = (event) => {
        setChosenProgramCategory(event.target.value)
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
    const handleCheck = (event) => {
        if(chosenProgram.id == null) {
            alert("Select a program")
        }
        else {
            apiAssignWorkout(chosenProgram.id, checked)
        }
        event.preventDefault()
    };

    return (
        <div>
            <h1 className="text-black text-4xl">Welcome to the Program Contributor Page.</h1>
            <div>
                <h2>Create a new program</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name of program:
                        <input type="text" value={programName} onChange={handleChangeName}/>
                    </label>
                    <label>
                        Category of program:
                        <input type="text" value={category} onChange={handleChangeCategory}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
            <div>
                <h2>Choose a Program to edit</h2>
                {programs.map((program, i) => <button key={i} onClick={() => listInfo(program)}>{program.name}</button>)}
                <h3>Chosen Program: {chosenProgram.name}</h3>
                <h4>Edit Program</h4>
                <form onSubmit={handleEdit}>
                    <label>
                        New name of program:
                        <input type="text" value={chosenProgramName} onChange={handleChangeNameEdit}/>
                    </label>
                    <label>
                        New category of program:
                        <input type="text" value={chosenProgramCategory} onChange={handleChangeCategoryEdit}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
            <div>
                <h4>Add workout to selected program</h4>

                <form onSubmit={handleCheck}>
                    {workouts.map((workout, i) => (
                        <div key={i}>
                            <input type="checkbox" value={workout.id} onChange={handleChecked} />
                            <span>{workout.name}</span>
                        </div>
                    ))}
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
};

export default ContributorProgramPage;