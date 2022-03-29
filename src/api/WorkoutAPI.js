import { API_URL } from "../API"
import keycloak from "../Keycloak";

export async function apiFetchAllWorkouts() {
    // Fetches all workouts
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${keycloak.token}`
        }
    }
    try {
        const response = await fetch(`${API_URL}api/Workouts/all`, requestOptions)
        const data = await response.json()

        return [null, data]
    }
    catch (e){
        return[e.message, []]
    }
}

export async function apiGetExercisesByWorkoutId(id) {
    // Fetches workout by workout ID
    const requestOptions = {
        headers: {
            'id': id,
            'Authorization': `Bearer ${keycloak.token}`
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
    // Creates a new workout
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${keycloak.token}`
        },
        body: JSON.stringify({
            "name": workoutName,
            "type": workoutType,
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

export async function apiUpdateWorkout(id, workoutName, workoutType) {
    // Updates an existing workout
    const requestOptions = {
        method: 'PUT',
        headers: {
            'id': id,
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${keycloak.token}`
        },
        body: JSON.stringify({
            "id": id,
            "name": workoutName,
            "type": workoutType,
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

export async function apiAssignSetByExercise(id, exerciseIDs) {
    // Assigns sets to a workout by exercise IDs
    const requestOptions = {
        method: 'PUT',
        headers: {
            'id': id,
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${keycloak.token}`
        },
        body: JSON.stringify(exerciseIDs)
     
    }

    try {
        const response = await fetch(`${API_URL}api/Workouts/assignSetsByExercise`, requestOptions)
        const data = await response.json()
        
        return [null, data]
    }
    catch (e){
        return [e.message, []]
    }
}

export async function apiAssignSetToWorkout(id, setIds) {
    // Assigns sets to a workout
    const requestOptions = {
        method: 'PUT',
        headers: {
            'id': id,
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${keycloak.token}`
        },
        body: JSON.stringify(setIds)
    }
    console.log(requestOptions.body)

    try {
        const response = await fetch(`${API_URL}api/Workouts/assignSets`, requestOptions)
        const data = await response.json()
        
        return [null, data]
    }
    catch (e){
        return [e.message, []]
    }
}