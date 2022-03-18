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

export async function apiCreateWorkout(workoutName, workoutType) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": workoutName,
            "type": workoutType,
            "complete": false
        })
    }

    try {
        const response = await fetch(`${API_URL}api/Workouts`, requestOptions)
        const data = await response.json()
        
        return [null, data]
    }
    catch (e){
        return [e.message, []]
    }
}

export async function apiUpdateWorkout(id, workoutName, workoutType, workoutCompleted) {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'id': id,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": id,
            "name": workoutName,
            "type": workoutType,
            "complete": workoutCompleted
        })
    }

    try {
        const response = await fetch(`${API_URL}api/Workouts`, requestOptions)
        const data = await response.json()
        
        return [null, data]
    }
    catch (e){
        return [e.message, []]
    }
}