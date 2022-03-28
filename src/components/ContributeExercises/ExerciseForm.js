import { useEffect, useState } from "react";
import { apiCreateExercise, apiUpdateExercise } from "../../api/ExerciseAPI";

const ExerciseForm = (props) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [targetMuscleGroup, setTargetMuscleGroup] = useState("")
    const [imageURL, setImageURL] = useState("")
    const [videoURL, setVideoURL] = useState("")


    useEffect(() => {
        // Update default values when selecting another exercise
        if (props.exercise){
            setName(props.exercise.name? props.exercise.name : "")
            setDescription(props.exercise.description ? props.exercise.description : "")
            setTargetMuscleGroup(props.exercise.targetMuscleGroup ? props.exercise.targetMuscleGroup : "")
            setImageURL(props.exercise.imageURL ? props.exercise.imageURL : "")
            setVideoURL(props.exercise.videoURL ? props.exercise.videoURL : "")
        }

    }, [props.exercise])

    const exerciseIsSelected = () => {
        // If an exercise is selected, the this will be an update form, otherwise create form
        return props.exercise
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let exerciseInput = {
            name: name,
            description: description,
            targetMuscleGroup: targetMuscleGroup,
            imageURL: imageURL,
            videoURL: videoURL
        }

        if (props.exercise){
            // Update existing exercise
            exerciseInput.id = props.exercise.id
            apiUpdateExercise(exerciseInput);
        }
        else {
            // Add new exercise
            apiCreateExercise(exerciseInput);
        }
        // Fetch updated exercise data after submitting form
        props.getNewExercises()
    }

    return (
        <div className="form-group col-md-5">
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="inputName"/>
                <br/>
                <label>
                    Description:
                </label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" id="inputDescription"/>
                <br/>
                <label>
                    Target muscle group:
                </label>
                <input type="text" value={targetMuscleGroup} onChange={(e) => setTargetMuscleGroup(e.target.value)} className="form-control" id="inputMuscleGroup"/>
                <br/>
                <label>
                    Image URL:
                </label>
                <input type="text" value={imageURL} onChange={(e) => setImageURL(e.target.value)} className="form-control" id="inputImage"/>
                <br/>
                <label>
                    Video URL:
                </label>
                <input type="text" value={videoURL} onChange={(e) => setVideoURL(e.target.value)} className="form-control" id="inputVideo"/>
                <br/>
                <button type="submit" value="Submit" className="btn btn-primary">{exerciseIsSelected()? "Update exercise" : "Add new exercise"}</button>
            </form>

        </div>
    )
};

export default ExerciseForm;
