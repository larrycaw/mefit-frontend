import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContainer } from '../../helpers/AppContainer'
import keycloak from "../../Keycloak"
import { apiGetCurrentGoal, apiGetUserGoals } from '../../api/GoalsAPI.js'
import { apiFetchAllWorkouts } from '../../api/WorkoutAPI'
import { apiFetchProgram } from "../../api/ProgramAPI"
import { apiUpdateGoalWorkout } from '../../api/GoalWorkoutAPI'
import Select from "react-select"

const GoalDetails = () => {
	const [currentGoal, setCurrentGoal] = useState({})
	const [program, setProgram] = useState({})
	const [goals, setGoals] = useState([])
	const [workouts, setWorkouts] = useState([])

	const selection = useRef(null)

	const [selectedWorkouts, setSelectedWorkouts] = useState([])

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

	const getProgram = async (id) => {
		await apiFetchProgram(id)
			.then(response => response[1])
			.then(data => setProgram(data))
	}

	const checkIfUserHasGoal = async () => {
		await apiGetCurrentGoal(keycloak.idTokenParsed.sub).then((response) => {
			console.log(response)
			if (response[1].status && (response[1].status === 404)) {
				// User has current goal, redirect to dashboard
				alert("You need to register a new goal!.");
				nav("/set-goal");
			}
		});
	};

	useEffect(() => {
		getCurrentGoal(keycloak.idTokenParsed.sub)
		getUserGoals(keycloak.idTokenParsed.sub)
		getAllWorkouts()
		setSelectedWorkouts([])
		checkIfUserHasGoal()
	}, [])

	useEffect(() => {
		if(currentGoal.programId !== undefined) {
			getProgram(currentGoal.programId)
		}	
	}, [currentGoal])
	
	const date = () => {
		if(currentGoal.programEndDate !== undefined) {
			let endDate = new Date(currentGoal.programEndDate)
			return endDate.toLocaleDateString("no-NO")
		} else return undefined
	}
	
	const programName = () => {
		if(program.name !== undefined) {
			return program.name
		}
	}

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
				let test = incompletedWorkoutGoals.find(w => parseInt(w.workoutId) === workout.id)
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
	
	
	let updateSelection = (workouts) => {
	
		let completedWorkouts = []
		
		workouts.forEach(w => {
			let currentWorkouts = currentGoal.workoutGoals.find(cw => cw.workoutId === parseInt(w.value))

			if(currentWorkouts){
				completedWorkouts = [...completedWorkouts, currentWorkouts]
			}
		})

		setSelectedWorkouts(completedWorkouts.map((w) => w.workoutId))
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		console.log(selectedWorkouts)

		if(selectedWorkouts.length > 0) {
			for(let i = 0; i < selectedWorkouts.length; i++) {
				apiUpdateGoalWorkout(currentGoal.workoutGoals[0].goalId, selectedWorkouts[i]).then((response) => {
					if(response[0]) {
						console.error(response[0])
					} else {
						console.log(response[1])
					}
				})
			}
			nav("/")
		}
	}

	return (
		<AppContainer>
			<h1>Dashboard</h1>
			<h2>My goal</h2>
			<p>Status of current goal with date</p>
			<p>Program name: { programName() }</p>
			<p>Finish by date: { date() }</p>
			<form onSubmit={handleSubmit}>
				<div>
					<h3>Workouts left to mark as completed:</h3>
					<Select ref={selection} options={workoutsLeft()} isMulti onChange={updateSelection}/>
				</div>
				<button type="submit" value="Submit" className="btn btn-primary">
					Mark as completed
				</button>
			</form>
		</AppContainer>
	)
}

export default GoalDetails