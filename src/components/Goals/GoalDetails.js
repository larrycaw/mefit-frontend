import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContainer } from '../../helpers/AppContainer'
import keycloak from "../../Keycloak"
import { apiGetCurrentGoal, apiGetUserGoals } from '../../api/GoalsAPI.js'
import { apiFetchAllWorkouts, apiFetchWorkout } from '../../api/WorkoutAPI'
import { apiFetchProgram } from "../../api/ProgramAPI"
import { apiUpdateGoalWorkout } from '../../api/GoalWorkoutAPI'
import Select from "react-select"

const GoalDetails = () => {
	const [currentGoal, setCurrentGoal] = useState({})
	const [program, setProgram] = useState({})
	const [goals, setGoals] = useState([])
	const [workouts, setWorkouts] = useState([])

	const selection = useRef(null);

	const [selectedWorkouts, setSelectedWorkouts] = useState([]);

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
		setSelectedWorkouts([])
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

	const achievedGoals = () => {
		let programIdsAndDates = [];
		if(goals.length > 0) {
			for(let i = 0; i < goals.length; i++) {
				if(goals[i].achieved === true) {
					let achievedProgram = getProgram(goals[i].programId)
					let date = new Date(goals[i].programEndDate);
					programIdsAndDates.push(achievedProgram.name)
					programIdsAndDates.push(date.toLocaleDateString("no-NO"))
				} 
			}
		}
		
		if(programIdsAndDates.length > 0){
			return programIdsAndDates
		} else return "You have no previous goals :("
	}

	const workoutsLeft = () => {
		let completedWorkoutGoals = []
		let workoutsLeft = [];
		if(currentGoal.workoutGoals !== undefined) {
			for(const workoutGoal of currentGoal.workoutGoals) {
				if(workoutGoal.completed === false) {
					completedWorkoutGoals.push(workoutGoal)
				}
			}
		}
		if(workouts.length > 0) {
			for(const workout of workouts) {
				if(completedWorkoutGoals.includes(workout.id)) {
					console.log("asd") // Stops here for some reason
					workoutsLeft.push(workout.name)
				}
			}
		}
		return workoutsLeft;
	}
	
	let updateSelection = (workouts) => {
	
		let completedWorkouts = []
		
		workouts.forEach(w => {
			let currentWorkouts = currentGoal.workoutGoals.find(cw => cw.id === parseInt(w.value))

			if(currentWorkouts){
				completedWorkouts = [...completedWorkouts, currentWorkouts]
			}
		})

		setSelectedWorkouts(completedWorkouts.map((w) => w.id))
	}

	if(currentGoal.programId !== undefined && goals.length > 0 && workouts.length > 0) {

		// if(program.name !== undefined) {
		// 	console.log(program)
		// }

		console.log(currentGoal)
		console.log(workouts)
		console.log(workoutsLeft())
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		if(selectedWorkouts.length > 0) {
			for(let i = 0; i < selectedWorkouts.length; i++) {
				apiUpdateGoalWorkout(selectedWorkouts[i].goalId, selectedWorkouts[i].workoutId).then((response) => {
					if(response[0]) {
						console.error(response[0])
					} else {
						console.log(response[1])
					}
				})
			}
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
					<Select ref={selection} options={workoutsLeft} isMulti onChange={updateSelection}/>
				</div>
				<button type="submit" value="Submit" className="btn btn-primary">
					Mark as completed
				</button>
			</form>
			<h2>Previously achieved goals with dates</h2>
			<p>{ achievedGoals() }</p>
		</AppContainer>
	)
}

export default GoalDetails