import { React, useState } from "react";
import AppContainer from "../../helpers/AppContainer";
import { apiAssignSetByExercise, apiCreateWorkout, apiFetchAllWorkouts, apiUpdateWorkout, apiAssignSetToWorkout } from '../../api/WorkoutAPI';


const CreateNewWorkout = (props) => {
    
    const [workoutName, setName] = useState("")
    const [workoutType, setType] = useState("")


    const handleSubmit = (event) => {
        apiCreateWorkout(workoutName, workoutType)
        alert("A new workout is created")
        event.preventDefault()
    }

    const handleChangeName = (event) => {
        setName(event.target.value)
    }
    const handleChangeType = (event) => {
        setType(event.target.value)
    }


    return (
        <div>
            <h2>Create a new workout</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group col-md-5">
                    <label>
                        Name of workout:
                    </label>
                    <input type="text" value={workoutName} onChange={handleChangeName} className="form-control" id="inputName"/>
                </div>
                <div className="form-group col-md-5">
                    <label>
                        Type of workout:
                    </label>
                    <input type="text" value={workoutType} onChange={handleChangeType} className="form-control" id="inputType"/>
                </div>
                <input type="submit" value="Submit" className="btn btn-primary"/>
            </form> 
        </div>
    )
};

export default CreateNewWorkout;