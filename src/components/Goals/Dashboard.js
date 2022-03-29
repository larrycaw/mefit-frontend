import React from 'react'
import AppContainer from '../../helpers/AppContainer'
import CalendarComponent from "./CalendarComponent"
import GoalPage from "./GoalPage"

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