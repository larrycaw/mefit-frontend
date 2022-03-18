import { useState } from "react";

const ExerciseForm = (props) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [targetMuscleGroup, setTargetMuscleGroup] = useState("")
    const [imageURL, setImageURL] = useState("")
    const [videoURL, setVideoURL] = useState("")

    return (<>
        <form>form here<button>click</button></form>
        {props.exercise? <>{props.exercise.name}</> : <>nope</>}
        </>)
};

export default ExerciseForm;
