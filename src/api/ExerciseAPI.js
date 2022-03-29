import { API_URL } from "../API"
import keycloak from "../Keycloak"

export async function apiFetchAllExercises() {
  // Fetches all exercises from DB
    const requestOptions = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${keycloak.token}`,
      }
  }

    try {
        const response = await fetch(`${API_URL}api/Exercises/all`, requestOptions)
        const data = await response.json()

        return [null, data]
    }
    catch (e){
        return[e.message, []]
    }
}

export async function apiUpdateExercise(exercise) {
  // Updates exercise in DB
    const requestOptions = {
        method: "PUT",
        headers: {
            id: exercise.id,
          "Content-Type": "application/json",
          'Authorization': `Bearer ${keycloak.token}`
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
  // Creates a new exercise in DB
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${keycloak.token}`
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