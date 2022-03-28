import React from 'react'
import AppContainer from '../../helpers/AppContainer'
import CalendarComponent from "./CalendarComponent"
import GoalPage from "./GoalPage"

// Dashboard logged in
const Dashboard = () => {
	return (
	<AppContainer>
		<div id="goal">
			<GoalPage />	
			<CalendarComponent />
		</div>
	</AppContainer>
	)
}
export default Dashboard