// const apiURL = "https://mefit.azurewebsites.net/api"
import { API_URL } from "../API"

export async function apiFetchAllSets() {

    try {
        const response = await fetch(`${API_URL}api/Set/all`)
        const data = await response.json()

        return [null, data]
    }
    catch (e){
        return[e.message, []]
    }
}

export async function apiGetSetById(id) {
    const requestOptions = {
        headers: {
            'id': id
        }
    }

    try {
        const response = await fetch(`${API_URL}api/Set`, requestOptions)
        const data = await response.json()

        return [null, data]
    }
    catch (e){
        return [e.message, []]
    }
}

export async function apiCreateSet(exerciseID, repetitions) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "exerciseId": exerciseID,
            "exerciseRepetitions": repetitions
        })
    }

    try {
        const response = await fetch(`${API_URL}api/Set`, requestOptions)
        const data = await response.json()
        
        return [null, data]
    }
    catch (e){
        return [e.message, []]
    }
}
