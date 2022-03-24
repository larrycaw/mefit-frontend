import { API_URL } from "../API"
import keycloak from "../Keycloak"

export async function apiGetCurrentGoal(id) {
    // const requestOptions = {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'UserId': id,
    //         'Authorization': `Bearer ${keycloak.token}`
    //     }
    // }
    
    try {
        console.log("apigetcurrentfdjasod")
        // const response = await fetch(`${API_URL}api/Goals/currentGoal`, requestOptions)
        const response = await fetch(`${API_URL}api/Goals/currentGoal`, {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${keycloak.token}`,
                'userId': keycloak.idTokenParsed.sub
            },
          });
          console.log("hello")
        const data = await response.json()

        return [null, data]
    }
    catch (e){
        return [e.message, []]
    }
}


export async function apiGetGoalById(id) {
    // GET GOAL BY GOAL ID
    try {
        // const requestOptions = {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${keycloak.token}`,
        //         'UserId': keycloak.idTokenParsed.sub
        //     }
        // }
        // const response = await fetch(`${API_URL}api/Goals/user`, requestOptions)

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
    // const requestOptions = {
    //     headers: {
    //         'UserId': keycloak.idTokenParsed.sub,
    //         'Authorization': `Bearer ${keycloak.token}`
    //     }
    // }

    try {
        // const response = await fetch(`${API_URL}api/Goals/user`, requestOptions)
        const response = await fetch(`${API_URL}api/Goals/user`, {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${keycloak.token}`,
                'UserId': keycloak.idTokenParsed.sub
            },
          })
          console.log(response)
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


        console.log(newGoal.workouts)
        // TODO: add workout ids from program too!!!!



        if (newGoal.workouts.length > 0){
            // Assign workouts to newly created goal
            apiAssignWorkoutsToGoal(data.id, newGoal.workouts)
            .then(response => response)
        }

        return [null, data]
    }
    catch(e){
        return [e.message, []]
    }
}


export async function apiAssignWorkoutsToGoal (goalId, workoutIds){
    console.log("hello")
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${keycloak.token}`,
            'GoalID': goalId
        },
        body: JSON.stringify(workoutIds)
    }

    console.log(requestOptions.body)

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