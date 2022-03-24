import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContainer } from '../../helpers/AppContainer'
import keycloak from "../../Keycloak"
import { apiGetCurrentGoal, apiGetUserGoals } from '../../api/GoalsAPI.js'
import { apiFetchAllWorkouts } from '../../api/WorkoutAPI'
import { apiFetchProgram } from "../../api/ProgramAPI";

const GoalDetails = () => {
    const [currentGoal, setCurrentGoal] = useState({})
    const [program, setProgram] = useState({})
    const [goals, setGoals] = useState([])
    const [workouts, setWorkouts] = useState([])

    const getCurrentGoal = async (id) => {
        await apiGetCurrentGoal(id)
            .then(response => response[1])
            .then(data => setCurrentGoal(data))
    }

    const getUserGoals = async (id) => {
        await apiGetUserGoals(id)
            .then(response => response[1])
            .then(data => setGoals(data))
    }

    const getAllWorkouts = async () => {
		await apiFetchAllWorkouts()
			.then(response => response[1])
			.then(data => setWorkouts(data))
	}

    const getProgram = async (id) => {
        await apiFetchProgram(id)
            .then(response => response[1])
            .then(data => setProgram(data))
    }

    useEffect(() => {
        getCurrentGoal(keycloak.idTokenParsed.sub)
        getUserGoals(keycloak.idTokenParsed.sub)
        getAllWorkouts()
    }, [])

    
    const date = () => {
		if(currentGoal.programEndDate !== undefined) {
			let endDate = new Date(currentGoal.programEndDate)
			return endDate.toLocaleDateString("no-NO")
		} else return undefined
	}

	const includedWorkouts = () => {
        if(currentGoal.workouts !== undefined && workouts.length > 0) {
            for(let i = 0; i < currentGoal.workouts.length; i++) {
                while(workouts[i].id === currentGoal.workouts[i])
                    return workouts[i].name
            }
        } else return undefined
	}
    
    if(currentGoal.programId !== undefined && goals.length > 0 && workouts.length > 0) {
        console.log(currentGoal)
        console.log(goals)
        console.log(workouts)
        console.log(keycloak.idTokenParsed.sub)
    }

    return (
        <AppContainer>
            <h1>Dashboard</h1>
            <h2>My goal</h2>
            <p>Status of current goal with date</p>
            <p>Program name:</p>
            <p>Finish by date: { date() }</p>
            <p>Included workouts: { includedWorkouts() }</p>
            <p>Checkboxes to check completed workouts for current goal</p>
            <h2>Previously achieved goals with dates</h2>
            <p>^Goals = Program achieved within date</p>
        </AppContainer>
    )
}

export default GoalDetails