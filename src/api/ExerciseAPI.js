// const apiURL = "https://mefit.azurewebsites.net/api"
import { API_URL } from "../API"

export async function apiFetchAllExercises() {

    try {
        const response = await fetch(`${API_URL}api/Exercises/all`)
        const data = await response.json()

        return [null, data]
    }
    catch (e){
        return[e.message, []]
    }
}

export async function apiUpdateExercise(exercise) {
    const requestOptions = {
        method: "PUT",
        headers: {
            id: exercise.id,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: exercise.id,
            name: exercise.name,
            description: exercise.description,
            targetMuscleGroup: exercise.targetMuscleGroup,
            imageURL: exercise.imageURL,
            videoURL: exercise.videoURL
          })
      };

      fetch(`${API_URL}api/Exercises`, requestOptions)
        .then((response) => {
            return "success"
        })
        .catch((e) => {
          console.log(e);
        });
}

export async function apiCreateExercise(exercise) {
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: exercise.name,
            description: exercise.description,
            targetMuscleGroup: exercise.targetMuscleGroup,
            imageURL: exercise.imageURL,
            videoURL: exercise.videoURL
        }),
      };

      fetch(`${API_URL}api/Exercises`, requestOptions)
        .then((response) => {
          return "success"
        })
        .catch((e) => {
          console.log(e);
        });
}