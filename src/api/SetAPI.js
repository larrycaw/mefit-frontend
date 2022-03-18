// const apiURL = "https://mefit.azurewebsites.net/api"
import { APIURL } from "../API"

export async function apiFetchAllSets() {

    try {
        const response = await fetch(`${APIURL}api/Set/all`)
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
        const response = await fetch(`${APIURL}api/Set`, requestOptions)
        const data = await response.json()

        return [null, data]
    }
    catch (e){
        return [e.message, []]
    }
}
