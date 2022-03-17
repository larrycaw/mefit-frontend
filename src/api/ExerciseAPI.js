// const apiURL = "https://mefit.azurewebsites.net/api"
import { APIURL } from "../API"

export async function apiFetchAllExercises() {

    try {
        const response = await fetch(`${APIURL}/Exercises/all`)
        const data = await response.json()

        return [null, data]
    }
    catch (e){
        return[e.message, []]
    }
}