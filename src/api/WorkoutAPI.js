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

export async function apiAssignSetByExercise(id, exerciseIDs) {

    const requestOptions = {
        method: 'PUT',
        headers: {
            'id': id,
            'Content-Type': 'application/json'
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
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(setIds)
    }
    // console.log(id, setIds)
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