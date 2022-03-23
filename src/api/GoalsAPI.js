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

export async function apiCreateUserGoal(newGoal, userId){
    // Creates a new goal for a user, then assigns workouts to the goal

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${keycloak.token}`
        },
        body: JSON.stringify({
            "programEndDate": newGoal.endDate.toJSON(),
            "programId": 1,
            "profileId": userId
        })
    }

    console.log(requestOptions.body)
    try {
        const response = await fetch(`${API_URL}api/Goals`, requestOptions)
        const data = await response.json()

        if (newGoal.workouts > 0){
            // Assign workouts to newly created goal
            return apiAssignWorkoutsToGoal(data.id, newGoal.workouts)
        }

        return [null, data]
    }
    catch(e){
        return [e.message, []]
    }
}


export async function apiAssignWorkoutsToGoal (goalId, workoutIds){
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${keycloak.token}`,
            'GoalID': goalId
        },
        body: JSON.stringify(workoutIds)
    }

    try {
        const response = await fetch(`${API_URL}api/Goals/assignWorkouts`, requestOptions)
        const data = await response.json()
        console.log(data)
        console.log(response)

        return [null, data]
    }
    catch(e){
        return [e.message, []]
    }
}