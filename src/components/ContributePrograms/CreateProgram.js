import { React, useState } from "react";
import {apiCreateProgram } from '../../api/ProgramAPI';


const CreateNewProgram = (props) => {
    const [category, setCategory] = useState("")
    const [programName, setName] = useState("")

    // Handle change of name
    const handleChangeName = (event) => {
        setName(event.target.value)
    }

    // Handle change of category
    const handleChangeCategory = (event) => {
        setCategory(event.target.value)
    }

    // Handle submit from form, creates a new program
    const handleSubmit = (event) => {
        apiCreateProgram(programName, category)
        alert("A new program is created")
        event.preventDefault()
    }
    
    return (
        <div>
            <h2>Create a new program</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group col-md-5">
                    <label>
                        Name of program:
                    </label>
                    <input type="text" value={programName} onChange={handleChangeName} className="form-control" id="inputName"/>
                </div>
                <div className="form-group col-md-5">
                    <label>
                        Category of program:
                        <input type="text" value={category} onChange={handleChangeCategory} className="form-control" id="inputCategory"/>
                    </label>

                </div>
                <input type="submit" value="Submit" className="btn btn-primary"/>
            </form>
        </div>
    )

}

export default CreateNewProgram;


