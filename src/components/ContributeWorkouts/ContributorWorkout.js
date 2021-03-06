import { React, useEffect, useRef, useState } from 'react';
import { apiFetchAllWorkouts } from '../../api/WorkoutAPI';
import { apiFetchAllExercises } from '../../api/ExerciseAPI';
import AppContainer from "../../helpers/AppContainer";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CreateNewWorkout from './CreateWorkout'
import EditWorkout from './EditWorkout';
import AddSetWorkout from './AddSettToWorkout';



const ContributorWorkoutPage = () => {
    const [exercises, setExercises] = useState([])
    const [workouts, setWorkouts] = useState([])

    // Get all registered workouts
    const getAllWorkouts = async () => {
        await apiFetchAllWorkouts()
            .then(response => response[1])
            .then(data => setWorkouts(data))
    }

    // Get all registered program
    const getAllExercises = async () => {
        await apiFetchAllExercises()
            .then(response => response[1])
            .then(data => setExercises(data))
    }

    useEffect( () => {
        getAllWorkouts()
        getAllExercises()
    },[])

    return (
        <AppContainer> 
            <div style={{marginTop: '100px'}}>
                <Tabs>
                    <TabList>
                        <Tab>
                            Create a new workout
                        </Tab>
                        <Tab>
                            Edit a workout
                        </Tab>
                        <Tab>
                            Add exercise to workout
                        </Tab>
                    </TabList>

                    <TabPanel>
                      <CreateNewWorkout/>
                    </TabPanel>

                    <TabPanel>       
                        <EditWorkout/>
                    </TabPanel>

                    <TabPanel>
                        <AddSetWorkout/>
                    </TabPanel>
                </Tabs>
            </div>
        </AppContainer>
    );
};

export default ContributorWorkoutPage;