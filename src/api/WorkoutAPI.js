import { API_URL } from "../API"
import keycloak from "../Keycloak";

export async function apiFetchAllWorkouts() {
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

    const requestOptions = {
        method: 'PUT',
        headers: {
            'id': id,
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${keycloak.token}`
        },
        body: JSON.stringify(setIds)
    }

    try {
        const response = await fetch(`${API_URL}api/Workouts/assignSets`, requestOptions)
        const data = await response.json()
        
        return [null, data]
    }
    catch (e){
        return [e.message, []]
    }
}