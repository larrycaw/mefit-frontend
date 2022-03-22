import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import keycloak from "../../Keycloak"
import { AppContainer } from '../../helpers/AppContainer'
import { apiGetCurrentGoal, apiGetUserGoals } from '../../api/GoalsAPI.js'
import { apiFetchAllWorkouts } from '../../api/WorkoutAPI'

const GoalPage = () => {

	const [goals, setGoals] = useState({})
	const [currentGoal, setCurrentGoal] = useState([])
	const [workouts, setWorkouts] = useState({})
	const navigate = useNavigate()
	
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

	const totalWorkouts = () => {
		if(currentGoal.workouts !== undefined)
			return currentGoal.workouts.length
		else return undefined
	}

	const workoutsCompleted = () => {
		let index = 0;
		let goalWorkoutIds = []
		let workoutIds = []

		if(currentGoal.workouts !== undefined){
			for (const workout in currentGoal.workouts) {
				goalWorkoutIds.push(workout)
			}
		}

		for(let i = 0; i< workouts.length; i++){
			if (workouts[i].complete !== undefined 
				&& workouts[i].complete === true) {
				workoutIds.push(workouts[i].id)
			}
		}

		// TODO: rename array
		const crossProduct = () => {
			let array = []
			for(goalWorkoutIds in workoutIds) {
				array.push(goalWorkoutIds)
				return array.length
			}
		}

		for (let i = 0; i < crossProduct(); i++) {
			index += 1;
		}
		return index;
	}

	if(currentGoal.status && currentGoal.status !== 404)
		return (
			<AppContainer>
				<main>
					<h1>Error code: { currentGoal.status }</h1>
					<p>Some error occurred :(</p>
					<button onClick={ () => 
						navigate('/new-goal', {replace: true}) } 
						type="button" className="btn btn-primary">
						Try again
					</button>
				</main>
			</AppContainer>
		  )
	else if(currentGoal.programId) 
		return (
			<AppContainer>
				<main>
					<h1>Goal dashboard</h1>
					<h4>Program progress</h4>
					<p>Total workouts in program: { totalWorkouts() }</p>
					<p>Workouts left: { workoutsCompleted() }</p>
					<p>Program end date: {date()}</p>
					<button onClick={ () => 
						navigate('/goal-details', {replace: true}) } 
						type="button" className="btn btn-primary">
						My goal
					</button>
				</main>
			</AppContainer>
		)
	else
		return (
			<AppContainer>
				<main>
					<h1>Goal dashboard</h1>
					<p>You have no active goals!</p>
					<button onClick={ () => 
						navigate('/new-goal', {replace: true}) } 
						type="button" className="btn btn-primary">
						New goal
					</button>
				</main>
			</AppContainer>
		  )
}

export default GoalPage