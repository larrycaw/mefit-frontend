import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import keycloak from "../../Keycloak"
import { AppContainer } from '../../helpers/AppContainer'
import { apiGetCurrentGoal, apiGetUserGoals, apiSetGoalAchieved } from '../../api/GoalsAPI.js'
import { apiFetchAllWorkouts } from '../../api/WorkoutAPI'

const GoalPage = () => {

	/* 
		TODO: Try catch on getCurrentGoal to avoid 404 error in console on no goal set?
	*/
	const [goals, setGoals] = useState([])
	const [currentGoal, setCurrentGoal] = useState({})
	const [workouts, setWorkouts] = useState([])

	const nav = useNavigate()
	
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
		if(currentGoal.workoutGoals !== undefined)
			return currentGoal.workoutGoals.length
		else return undefined
	}

	const workoutsCompleted = () => {
		if(currentGoal.workoutGoals !== undefined) {
			let workoutsTmp = []
			for(let i = 0; i < currentGoal.workoutGoals.length; i++) {
				if(currentGoal.workoutGoals[i].completed === false) {
					workoutsTmp.push(currentGoal.workoutGoals[i])
				}
			}
			return workoutsTmp.length
		}
	}

	const setAchievedIfWorkoutsComplete = () => {
		let incompletedWorkoutGoals = []
		let workoutsLeft = []

		if(currentGoal.workoutGoals !== undefined) {
			for(const workoutGoal of currentGoal.workoutGoals) {
				if(workoutGoal.completed === false) {
					incompletedWorkoutGoals.push(workoutGoal)
				}
			}
		}

		if(workouts.length > 0) {
			for(const workout of workouts) {
				let test = incompletedWorkoutGoals.find(w => parseInt(w.workoutId) === workout.id)
				if(test) {
					workoutsLeft.push(workout)
				}
			}
		}

		if(workoutsLeft.length === 0 && currentGoal.workoutGoals !== undefined && currentGoal.achieved !== true) {
			apiSetGoalAchieved(currentGoal)
				.then((response) => {
					if(response[0]) {
						console.error(response[0])
					} else {
						console.log(response[1])
					}
				})
		}
	}
	
	useEffect(() => {
		setAchievedIfWorkoutsComplete();
	}, [workouts])

	if(currentGoal.programId !== undefined && goals.length > 0 && workouts.length > 0) {
		console.log(currentGoal)
	}

	if(currentGoal.status && currentGoal.status !== 404)
		return (
			<AppContainer>
				<main>
					<h1>Error code: { currentGoal.status }</h1>
					<p>Some error occurred :(</p>
					<button onClick={ () => 
						nav('/set-goal', {replace: true}) } 
						type="button" className="btn btn-primary">
						Try again
					</button>
				</main>
			</AppContainer>
		  )
	else if(currentGoal.achieved !== undefined && currentGoal.achieved === false) 
		return (
			<AppContainer>
				<main>
					<h1>Goal dashboard</h1>
					<h4>Program progress</h4>
					<p>Total workouts in program: { totalWorkouts() }</p>
					<p>Workouts left: { workoutsCompleted() }</p>
					<p>Program end date: { date() }</p>
					<button onClick={ () => 
						nav('/goal-details', {replace: true}) } 
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
						nav('/set-goal', {replace: true}) } 
						type="button" className="btn btn-primary">
						New goal
					</button>
				</main>
			</AppContainer>
		  )
}

export default GoalPage