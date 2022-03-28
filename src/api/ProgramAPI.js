import { API_URL } from "../API"
import keycloak from "../Keycloak";

export async function apiFetchAllPrograms() {
    // Fetches all programs from DB
    try {
        const response = await fetch(`${API_URL}api/MFProgram/all`, {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${keycloak.token}`
            },
          })
        const data = await response.json()

        return [null, data]
    }
    catch (e){
        return[e.message, []]
    }
}

export async function apiFetchProgram(id) {
    /// Fetches a program by program ID
    try {
        const response = await fetch(`${API_URL}api/MFProgram`, {
            headers: { 
                "id": id,
                "Authorization": `Bearer ${keycloak.token}`
            },
          })
        const data = await response.json()

        return [null, data]
    }
    catch (e){
        return[e.message, []]
    }
}

export async function apiCreateProgram(programName, programCategory) {
    // Creates a new program
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${keycloak.token}`
        },
        body: JSON.stringify({
            "name": programName,
            "category": programCategory,
        })
    }

    try {
        const response = await fetch(`${API_URL}api/MFProgram`, requestOptions)
        const data = await response.json()
        
        return [null, data]
    }
    catch (e){
        return [e.message, []]
    }
}

export async function apiUpdateProgram(id, programName, programCategory) {
    // Updates an existing program
    const requestOptions = {
        method: 'PUT',
        headers: {
            'id': id,
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${keycloak.token}`
        },
        body: JSON.stringify({
            "id": id,
            "name": programName,
            "category": programCategory,
        })
    }

    try {
        const response = await fetch(`${API_URL}api/MFProgram/updateProgram`, requestOptions)
        const data = await response.json()
        
        return [null, data]
    }
    catch (e){
        return [e.message, []]
    }
}

export async function apiAssignWorkout(id, workoutIDs) {
    // Assigns workouts to a program
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'id': id,
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${keycloak.token}`
        },
        body: JSON.stringify(workoutIDs)
     
    }

    try {
        const response = await fetch(`${API_URL}api/MFProgram/assignWorkouts`, requestOptions)
        const data = await response.json()
        
        return [null, data]
    }
    catch (e){
        return [e.message, []]
    }
}