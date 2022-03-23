import { API_URL } from "../API"
import keycloak from "keycloak-js"

export async function apiGetCurrentGoal(id) {
    const requestOptions = {
        headers: {
            'userId': id,
            'Authorization': `Bearer ${keycloak.token}`
        }
    }
    
    try {
        const response = await fetch(`${API_URL}api/Goals/currentGoal`, requestOptions)
        const data = await response.json()

        return [null, data]
    }
    catch (e){
        return [e.message, []]
    }
}


export async function apiGetGoalById(id) {
    const requestOptions = {
        headers: {
            'userId': id,
            'Authorization': `Bearer ${keycloak.token}`
        }
    }

    try {
        const response = await fetch(`${API_URL}api/Goals/user`, requestOptions)
        const data = await response.json()

        return [null, data]
    }
    catch(e){
        return [e.message, []]
    }
}

export async function apiGetUserGoals(id) {
    const requestOptions = {
        headers: {
            'userId': id,
            'Authorization': `Bearer ${keycloak.token}`
        }
    }

    try {
        const response = await fetch(`${API_URL}api/Goals/user`, requestOptions)
        const data = await response.json()

        return [null, data]
    }
    catch(e){
        return [e.message, []]
    }
}

