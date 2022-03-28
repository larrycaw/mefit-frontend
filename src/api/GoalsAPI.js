import { API_URL } from "../API"
import keycloak from "../Keycloak"

export async function apiGetCurrentGoal(id) {
    
    try {
        const response = await fetch(`${API_URL}api/Goals/currentGoal`, {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${keycloak.token}`,
                'userId': keycloak.idTokenParsed.sub
            },
          });
        const data = await response.json()

        return [null, data]
    }
    catch (e){
        return [e.message, []]
    }
}


export async function apiGetGoalById(id) {
    
    try {

        const response = await fetch(`${API_URL}api/Goals/user`, {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${keycloak.token}`,
                'id': id
            },
          })
        const data = await response.json()

        return [null, data]
    }
    catch(e){
        return [e.message, []]
    }
}

export async function apiGetUserGoals(id) {

    try {
        const response = await fetch(`${API_URL}api/Goals/user`, {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${keycloak.token}`,
                'UserId': keycloak.idTokenParsed.sub
            },
        })
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
            "programId": newGoal.program,
            "profileId": keycloak.idTokenParsed.sub
        })
    }

    try {
        const response = await fetch(`${API_URL}api/Goals`, requestOptions)

        if (response.status === 409){
            return ["You already have an active goal", []]
        }

        const data = await response.json()

        for (const workoutId of newGoal.workouts) {
            await apiAssignWorkoutsToGoal(data.id, workoutId)
        }
        return [null, []]
    }
    catch(e){
        return [e.message, []]
    }
}

export async function apiSetGoalAchieved (currentGoal) {
    const requestOptions = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${keycloak.token}`,
            'goalID': currentGoal.workoutGoals[0].goalId
        },
        body: JSON.stringify({
            "id":  currentGoal.workoutGoals[0].goalId,
            "programEndDate": currentGoal.programEndDate,
            "achieved": true,
            "profileId": keycloak.idTokenParsed.sub,
            "programId": currentGoal.programId
        })
    }

    try {
        await fetch(`${API_URL}api/Goals/updateGoal`, requestOptions)
        return [null, []]
    }
    catch(e){
        return [e.message, []]
    }
}


export async function apiAssignWorkoutsToGoal (goalId, workoutId){
    // Assigns workout to existing goal

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${keycloak.token}`,
            'GoalID': goalId
        },
        body: JSON.stringify({
            "workoutId":  workoutId,
            "goalId": goalId,
            "completed": false
        })
    }

    try {
        const response = await fetch(`${API_URL}api/GoalWorkout`, requestOptions)
        const data = await response.json()

        return [null, data]
    }
    catch(e){
        return [e.message, []]
    }
}