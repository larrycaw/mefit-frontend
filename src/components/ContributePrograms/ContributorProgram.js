import { React, useEffect, useRef, useState } from 'react';
import keycloak from '../../Keycloak';
import { APIURL } from "../../API.js";
import { apiAssignSetByExercise, apiCreateWorkout, apiFetchAllWorkouts, apiUpdateWorkout } from '../../api/WorkoutAPI';
import { apiCreateProgram } from '../../api/ProgramAPI';
import { apiFetchAllPrograms, apiUpdateProgram, apiAssignWorkout } from '../../api/ProgramAPI';
import AppContainer from "../../helpers/AppContainer";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CreateNewProgram from './CreateProgram';
import EditProgram from './EditProgram';
import AddWorkoutToProgram from './AddWorkoutToProgram';

const ContributorProgramPage = () => {
    const [programs, setPrograms] = useState([])
    const [workouts, setWorkouts] = useState([])

    const [chosenProgram, setChosenProgram] = useState([])
    const [checked, setChecked] = useState([])


    const getAllWorkouts = async () => {
        await apiFetchAllWorkouts()
            .then(response => response[1])
            .then(data => setWorkouts(data))
    }

    const getAllPrograms = async () => {
        await apiFetchAllPrograms()
            .then(response => response[1])
            .then(data => setPrograms(data))
    }

    useEffect( () => {
        getAllPrograms()
        getAllWorkouts()
    },[])

    const handleChecked = (event) => {

        var updateList = [...checked]
        const exists = updateList.some(v => (v == event.target.value))
        if(exists == false) {
            updateList.push(parseInt(event.target.value))
            setChecked(updateList);
        }
        else {
            setChecked(v => v.filter((item) => item != event.target.value))
        }
    }
    const handleCheck = (event) => {
        if(chosenProgram.id == null) {
            alert("Select a program")
        }
        else {
            apiAssignWorkout(chosenProgram.id, checked)
        }
        event.preventDefault()
    };

    return (
        <AppContainer>
            <div style={{marginTop: '100px'}}>
                <Tabs>
                    <TabList>
                        <Tab>
                            Create a new program
                        </Tab>
                        <Tab>
                            Edit a program
                        </Tab>
                        <Tab>
                            Add workout to program
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <CreateNewProgram/>
                    </TabPanel>

                    <TabPanel>
                        <EditProgram/>
                    </TabPanel>

                    <TabPanel>
                        <AddWorkoutToProgram/>
                    </TabPanel>        
                </Tabs>

            </div>
        </AppContainer>
    );
};

export default ContributorProgramPage;