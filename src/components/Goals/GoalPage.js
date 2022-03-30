import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContainer } from '../../helpers/AppContainer'
import keycloak from "../../Keycloak"
import { apiGetCurrentGoal, apiSetGoalAchieved } from '../../api/GoalsAPI.js'
import { apiFetchAllWorkouts } from '../../api/WorkoutAPI'
import { apiFetchProgram } from "../../api/ProgramAPI"
import { apiUpdateGoalWorkout } from '../../api/GoalWorkoutAPI'
import Select from "react-select"

const GoalDetails = () => {
	// States for current goal, program, workouts and selected workouts
	const [currentGoal, setCurrentGoal] = useState({})
	const [program, setProgram] = useState({})
	const [workouts, setWorkouts] = useState([])
	const [selectedWorkouts, setSelectedWorkouts] = useState([])

	// ref object to reset workout selection on submit
	const selection = useRef(null)

	// declaring useNavigate()-const
	const nav = useNavigate()

	// arrow function expression to make an api-call that returns current goal and sets it to state
	const getCurrentGoal = async (id) => {
		await apiGetCurrentGoal(id)
			.then(response => response[1])
			.then(data => setCurrentGoal(data))
	}

	// arrow function expression to make an api-call that returns all workouts and sets it to state
	const getAllWorkouts = async () => {
		await apiFetchAllWorkouts()
			.then(response => response[1])
			.then(data => setWorkouts(data))
	}

	// arrow function expression to make an api-call that returns a program and sets it to state
	const getProgram = async (id) => {
		await apiFetchProgram(id)
			.then(response => response[1])
			.then(data => setProgram(data))
	}

	// arrow function expression to make an api-call that checks if user has a current goal which is not achieved  
	const checkIfUserHasGoal = async () => {
		await apiGetCurrentGoal(keycloak.idTokenParsed.sub)
			.then((response) => {
				if (response[1].status && (response[1].status === 404)) {
					// User has current goal, redirect to dashboard
					alert("You need to register a new goal!.");
					nav("/set-goal");
				}
		})
	}

	// check if user has a goal & set current goal, all workouts, selected workouts to state on load
	useEffect(() => {
		getCurrentGoal(keycloak.idTokenParsed.sub)
		getAllWorkouts()
		setSelectedWorkouts([])
		checkIfUserHasGoal()
	}, [])

	// set current goal's program to state on load
	useEffect(() => {
		if(currentGoal.programId !== undefined) {
			getProgram(currentGoal.programId)
		}	
	}, [currentGoal])
	
	// arrow function expression that returns current goal's end date formatted
	const date = () => {
		if(currentGoal.programEndDate !== undefined) {
			return new Date(currentGoal.programEndDate).toLocaleDateString("no-NO")
		}
	}
	
	// arrow function expression that returns current goal's program name if not undefined
	const programName = () => {
		if(program.name !== undefined) {
			return program.name
		}
	}

	// arrow function expression that returns workouts left to populate Select-element
	const workoutsLeft = () => {
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

		let workoutOptions = workoutsLeft.map((workout) => {
			return {value: workout.id, label: workout.name}
		})
		
		return workoutOptions
	}
	
	// arrow function expression that updates selection when user clicks on a workout
	let updateSelection = (workouts) => {
	
		let completedWorkouts = []
		
		workouts.forEach(w => {
			let currentWorkouts = currentGoal.workoutGoals.find(cw => 
				cw.workoutId === parseInt(w.value))

			if(currentWorkouts){
				completedWorkouts = [...completedWorkouts, currentWorkouts]
			}
		})

		setSelectedWorkouts(completedWorkouts.map((w) => w.workoutId))
	}

	// arrow function expression that handles the form-submission's
	const handleSubmit = async (event) => {
		event.preventDefault()

		if(selectedWorkouts.length > 0) {
			for(let i = 0; i < selectedWorkouts.length; i++) {
				apiUpdateGoalWorkout(currentGoal.workoutGoals[0].goalId,
					selectedWorkouts[i]).then((response) => {

					if(response[0]) {
						console.error(response[0])
					} else {
						console.log(response[1])
					}
				})
			}

			if (workoutsLeft().length === selectedWorkouts.length){
				apiSetGoalAchieved(currentGoal)
				.then (() => nav("/"))
			}
			else {
				nav("/")
			}
		}
	}

	return (
		<AppContainer>
			<main id="goal-details">
				<h1 className="display-4">My goal</h1>
				<p>Program name: <b>{ programName() }</b></p>
				<p>Finish by date: <b>{ date() }</b></p>
				<form onSubmit={handleSubmit}>
					<div className="form-group row mt-4">
						<legend className="col-form-label pt-0">
							<h3 className="lead">
								Workouts left to mark as completed:
							</h3>
						</legend>
						<Select ref={selection} options={workoutsLeft()}
							isMulti onChange={updateSelection}/>
					</div>
					<button type="submit" value="Submit" className="btn btn-primary mt-2">
						Mark as completed
					</button>
				</form>
			</main>
		</AppContainer>
	)
}

export default GoalDetails