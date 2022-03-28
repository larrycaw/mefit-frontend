import { React, useEffect, useState } from 'react';
import { apiFetchAllPrograms, apiUpdateProgram } from '../../api/ProgramAPI';


const EditProgram = (props) => {
    
    const [chosenProgramName, setChosenProgramName] = useState("")
    const [chosenProgramCategory, setChosenProgramCategory] = useState("")
    const [chosenProgram, setChosenProgram] = useState([])
    const [programs, setPrograms] = useState([])

    const getAllPrograms = async () => {
        await apiFetchAllPrograms()
            .then(response => response[1])
            .then(data => setPrograms(data))
    }

    useEffect( () => {
        getAllPrograms()
    },[])


    
    const handleEdit = (event) => {
        if(chosenProgramName == "" && chosenProgramCategory) {
            alert("Insert edits")
        }
        else if(chosenProgramName != "" && chosenProgramCategory != "") {
            apiUpdateProgram(chosenProgram.id, chosenProgramName, chosenProgramCategory)
        }

        else if(chosenProgramName == "" && chosenProgramCategory != "") {
            apiUpdateProgram(chosenProgram.id, chosenProgram.name, chosenProgramCategory)
        }

        else if(chosenProgramName != "" && chosenProgramCategory == "") {
            apiUpdateProgram(chosenProgram.id, chosenProgramName, chosenProgram.category)
        }

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

    return (
        <div>
            <h2>Choose a Program to edit</h2>
            {programs.map((program, i) => <button key={i} onClick={() => listInfo(program)} className="btn btn-secondary" style={{background: '#7D9FE2', color: 'black' }}>{program.name}</button>)}
            <h3>Chosen Program: {chosenProgram.name}</h3>
            <h4>Edit Program</h4>
            <h6>Old name: {chosenProgram.name}</h6>
            <h6>Old category: {chosenProgram.category}</h6>

            <form onSubmit={handleEdit}>
                <div className='form-group col-md-5'>
                    <label>
                        New name of program:
                    </label>
                    <input type="text" value={chosenProgramName} onChange={handleChangeNameEdit} className="form-control" id="newName"/>
                </div>
                <div className="form-group col-md-5">
                    <label>
                        New category of program:
                    </label>
                    <input type="text" value={chosenProgramCategory} onChange={handleChangeCategoryEdit} className="form-control" id="newCategory"/>
                </div>
                <input type="submit" value="Submit" className='btn btn-primary'/>
            </form>
        </div>
    )

}

export default EditProgram