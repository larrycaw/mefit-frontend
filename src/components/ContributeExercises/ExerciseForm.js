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

    return (<>
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </label>
            <br/>
            <label>
                Description:
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </label>
            <br/>
            <label>
                Target muscle group:
                <input type="text" value={targetMuscleGroup} onChange={(e) => setTargetMuscleGroup(e.target.value)}/>
            </label>
            <br/>
            <label>
                Image URL:
                <input type="text" value={imageURL} onChange={(e) => setImageURL(e.target.value)}/>
            </label>
            <br/>
            <label>
                Video URL:
                <input type="text" value={videoURL} onChange={(e) => setVideoURL(e.target.value)}/>
            </label>
            <br/>
            <button type="submit" value="Submit">{exerciseIsSelected()? "Update exercise" : "Add new exercise"}</button>
        
        </form>
        </>)
};

export default ExerciseForm;
