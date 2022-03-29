import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import keycloak from "../../Keycloak"
import { AppContainer } from '../../helpers/AppContainer'
import { apiGetCurrentGoal, apiGetUserGoals, apiSetGoalAchieved } from '../../api/GoalsAPI.js'
import { apiFetchAllWorkouts } from '../../api/WorkoutAPI'
import { apiFetchAllPrograms } from '../../api/ProgramAPI'
import CalendarComponent from './CalendarComponent'

const GoalPage = () => {

	// States for goals, current goal, workouts and programs
	const [goals, setGoals] = useState([])
	const [currentGoal, setCurrentGoal] = useState({})
	const [workouts, setWorkouts] = useState([])
	const [programs, setPrograms] = useState([])

	// declaring useNavigate()-const
	const nav = useNavigate()
	
	// arrow function expression to make an api-call that returns current goal and sets it to state
	const getCurrentGoal = async (id) => {
		await apiGetCurrentGoal(id)
			.then(response => response[1])
			.then(data => setCurrentGoal(data))
	}
	
	// arrow function expression to make an api-call that returns all user goals and sets it to state
	const getUserGoals = async (id) => {
		await apiGetUserGoals(id)
		.then(response => response[1])
		.then(data => setGoals(data))
	}

	// arrow function expression to make an api-call that returns all workouts and sets it to state
	const getAllWorkouts = async () => {
		await apiFetchAllWorkouts()
			.then(response => response[1])
			.then(data => setWorkouts(data))
	}

	// arrow function expression to make an api-call that returns all programs and sets it to state
	const getPrograms = async () => {
		await apiFetchAllPrograms()
			.then (result => result[1])
			.then((data) => setPrograms(data))
	}

	// set current goal, all workouts, selected workouts to state on load
	useEffect(() => {
		getCurrentGoal(keycloak.idTokenParsed.sub)
		getUserGoals(keycloak.idTokenParsed.sub)
		getAllWorkouts()
		getPrograms()
	}, [])
	
	// arrow function expression that returns previously achieved goals
	// or a string saying user has no previously achieved goals
	const achievedGoals = () => {
		let programIdsAndDates = []

		if(goals.length > 0 && programs.length > 0) {
			for(let i = 0; i < goals.length; i++) {
				if(goals[i].achieved === true) {
					let programName = programs.find(p => p.id === parseInt(goals[i].programId)).name;
					let date = new Date(goals[i].programEndDate)
					programIdsAndDates.push(
						<li style={{listStyle: "none"}}>
							Program name: <b><i>{programName}</i></b>
							 - End date: <b>({date.toLocaleDateString("no-NO")})</b>
						</li>)
				}
			}
		}
		
		if(programIdsAndDates.length > 0){
			return programIdsAndDates
		} else return "You have no previous goals :("
	}

	// arrow function expression that returns current goal's date in norwegian format
	const date = () => {
		if(currentGoal.programEndDate !== undefined) {
			// let endDate = new Date(currentGoal.programEndDate)
			return new Date(currentGoal.programEndDate)
						.toLocaleDateString("no-NO")
			// return endDate.toLocaleDateString("no-NO")
		}
	}

	// arrow function expression to get length of total workouts (completed = true/false)
	const totalWorkouts = () => {
		if(currentGoal.workoutGoals !== undefined)
			return currentGoal.workoutGoals.length
	}

	// arrow function expression to get length of workouts left
	const workoutsLeft = () => {
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

	// arrow function expression to set goal to achieved if all workouts are completed
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
				let test = incompletedWorkoutGoals.find(w => 
					parseInt(w.workoutId) === workout.id)
				if(test) {
					workoutsLeft.push(workout)
				}
			}
		}

		if(workoutsLeft.length === 0 && currentGoal.workoutGoals 
			!== undefined && currentGoal.achieved !== true) {
			apiSetGoalAchieved(currentGoal)
				.then((response) => {
					if(response[0]) {
						console.error(response[0])
					} else {
						console.log(response[1])
						getCurrentGoal(keycloak.idTokenParsed.sub)
					}
				})
		}
	}
	
	// set goal to achieved (if conditions are met) on page load
	useEffect(() => {
		setAchievedIfWorkoutsComplete();
	}, [workouts])

	if(currentGoal.status && currentGoal.status !== 404)
		return (
			<AppContainer>
				<div id="goal-dashboard">
					<main id="goal-dashboard">
						<h1 className="display-4">
							Error code: { currentGoal.status }
						</h1>
						<blockquote className="blockquote">
							Some error occurred :(
						</blockquote>
						<button onClick={ () => 
							nav('/set-goal', {replace: true}) } 
							type="button" className="btn btn-primary">
							Try again
						</button>
					</main>
					<CalendarComponent />
				</div>
			</AppContainer>
		  )
	else if(currentGoal.achieved !== undefined 
		&& currentGoal.achieved === false) 
		return (
			<AppContainer>
				<div id="goal-dashboard">
					<main>
						<h1 className="display-4">Dashboard</h1>
						<blockquote className="blockquote">
							Program progress
						</blockquote>
						<p className="lead">
							Total workouts in program: <b>{ totalWorkouts() }</b>
						</p>
						<p className="lead">
							Workouts left: <b>{ workoutsLeft() }</b>
						</p>
						<p className="lead">
							Program end date: <b>{ date() }</b>
						</p>
						<button onClick={ () => 
							nav('/goals', {replace: true}) } 
							type="button" className="btn btn-primary">
							My goal
						</button>
						<h2 className="display-6">Previously achieved goals</h2>
						{ achievedGoals() }
					</main>
					<CalendarComponent />
				</div>
			</AppContainer>
		)
	else
		return (
			<AppContainer>
				<div id="goal-dashboard">
					<main>
						<h1 className="display-4">Dashboard</h1>
						<blockquote className="blockquote">
							You have no active goals!
						</blockquote>
						<button onClick={ () => 
							nav('/set-goal', {replace: true}) } 
							type="button" className="btn btn-primary">
							New goal
						</button>
						<div>
							<h2 className="display-6">Previously achieved goals</h2>
							{ achievedGoals() }
						</div>
					</main>
					<CalendarComponent />
				</div>
			</AppContainer>
		  )
}

export default GoalPage