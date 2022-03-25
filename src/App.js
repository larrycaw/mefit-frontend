import React from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar"
import Dashboard from "./components/Goals/Dashboard";
import GoalPage from "./components/Goals/GoalPage";
import WorkoutPage from "./components/Workouts/Workoutpage";
import ExercisePage from "./components/Exercises/Exercisepage"
import ProtectRoute from "./helpers/ProtectRoute";
import ProgramPage from "./components/Programs/ProgramPage";
import ContributorWorkoutPage from "./components/Contributors/ContributorWorkout"
import ProfilePage from "./components/Profile/ProfilePage";
import 'react-calendar/dist/Calendar.css';
import ContributorProgramPage from "./components/Contributors/ContributorProgram";
import ContributeExercisesPage from "./components/ContributeExercises/ContributeExercisesPage";
import SetGoalPage from "./components/SetGoal/SetGoalPage";
import GoalDetails from "./components/Goals/GoalDetails";
import ContributorRoute from "./helpers/ContributorRoute";

function App() {
 return (
   <div>
     <ReactKeycloakProvider authClient={keycloak} initOptions={{ onLoad: 'login-required'}}>
       <BrowserRouter>
         <Routes>
           <Route
                path="/"
                element={
                    <ProtectRoute>
                      <Navbar />
                        <Dashboard />
                    </ProtectRoute>
                }
            />
            <Route
                path="/goals"
                element={
                    <ProtectRoute>
                      <Navbar />
                        <GoalPage />
                    </ProtectRoute>
                }
            />
            <Route
                path="/goal-details"
                element={
                    <ProtectRoute>
                      <Navbar />
                        <GoalDetails />
                    </ProtectRoute>
                }
            />
          <Route
             path="/workouts"
             element={
               <ProtectRoute>
                 <Navbar />
                 <WorkoutPage />
               </ProtectRoute>
             }
           />
          <Route
             path="/exercises"
             element={
               <ProtectRoute>
                 <Navbar />
                 <ExercisePage />
               </ProtectRoute>
             }
           />
           <Route 
           exact path="/programs" 
           element={
           <ProtectRoute> 
             <Navbar />
             <ProgramPage/> 
             </ProtectRoute> 
            }
            />
           <Route
             path="/workoutcontributor"
             element={
              <ProtectRoute>
                <Navbar />
               <ContributorRoute>
                 <ContributorWorkoutPage />
               </ContributorRoute>
               </ProtectRoute>
              }
             />
             <Route
             path="/profile"
             element={
               <ProtectRoute>
                 <Navbar />
                 <ProfilePage />
               </ProtectRoute>
             }
            />
            <Route
             path="/programcontributor"
             element={
              <ProtectRoute>
                <Navbar />
               <ContributorRoute>
                 <ContributorProgramPage />
               </ContributorRoute>
               </ProtectRoute>
             }
            />
           <Route
             path="/contribute/exercises"
             element={
               <ProtectRoute>
                 <Navbar />
               <ContributorRoute>
                 <ContributeExercisesPage />
               </ContributorRoute>
               </ProtectRoute>
             }
           />
           <Route
             path="/set-goal"
             element={
               <ProtectRoute>
                 <Navbar />
                 <SetGoalPage />
               </ProtectRoute>
             }
           />
         </Routes>
       </BrowserRouter>
     </ReactKeycloakProvider>
   </div>
 );
}

export default App;
