import { API_URL } from "../API"

export async function apiFetchAllWorkouts() {

    try {
        const response = await fetch(`${API_URL}api/Workouts/all`)
        const data = await response.json()

        return [null, data]
    }
    catch (e){
        return[e.message, []]
    }
}

export async function apiGetExercisesByWorkoutId(id) {
    const requestOptions = {
        headers: {
            'id': id
        }
    }

    try {
        const response = await fetch(`${API_URL}api/Workouts/exercises`, requestOptions)
        const data = await response.json()
        
        return [null, data]
    }
    catch (e){
        return [e.message, []]
    }
}
