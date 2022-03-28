import { API_URL } from "../API"
import keycloak from "../Keycloak"

export async function apiUpdateGoalWorkout(goalId, workoutId) {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'goalId': goalId,
            'workoutId': workoutId,
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${keycloak.token}`
        },
        body: JSON.stringify({
            "workoutId": workoutId,
            "goalId": goalId,
            "completed": true,
        })
    }

    try {
        const response = await fetch(`${API_URL}api/GoalWorkout/update`, requestOptions)
        
        return [null, []]
    }
    catch (e){
        return [e.message, []]
    }
}