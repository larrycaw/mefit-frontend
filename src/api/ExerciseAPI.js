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

}

export async function apiCreateExercise(exercise) {

}