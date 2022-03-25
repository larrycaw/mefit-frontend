import React from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar"
import WelcomePage from "./pages/Homepage";
import SecuredPage from "./pages/Securedpage";
import Dashboard from "./components/Goals/Dashboard";
import GoalPage from "./components/Goals/GoalPage";
import WorkoutPage from "./components/Workouts/Workoutpage";
import ExercisePage from "./components/Exercises/Exercisepage"
import PrivateRoute from "./helpers/PrivateRoute";
import ProgramPage from "./components/Programs/ProgramPage";
import ContributorWorkoutPage from "./components/Contributors/ContributorWorkout"
import ProfilePage from "./components/Profile/ProfilePage";
import 'react-calendar/dist/Calendar.css';
import ContributorProgramPage from "./components/Contributors/ContributorProgram";
import ContributeExercisesPage from "./components/ContributeExercises/ContributeExercisesPage";
import SetGoalPage from "./components/SetGoal/SetGoalPage";
import GoalDetails from "./components/Goals/GoalDetails";

function App() {
 return (
   <div>
     <ReactKeycloakProvider authClient={keycloak}>
       <BrowserRouter>
       <Navbar />
         <Routes>
           <Route exact path="/" element={<WelcomePage />} />
           <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            />
            <Route
                path="/goals"
                element={
                    <PrivateRoute>
                        <GoalPage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/goal-details"
                element={
                    <PrivateRoute>
                        <GoalDetails />
                    </PrivateRoute>
                }
            />
           <Route
             path="/secured"
             element={
               <PrivateRoute>
                 <SecuredPage />
               </PrivateRoute>
             }
           />
          <Route
             path="/workouts"
             element={
               <PrivateRoute>
                 <WorkoutPage />
               </PrivateRoute>
             }
           />
          <Route
             path="/exercises"
             element={
               <PrivateRoute>
                 <ExercisePage />
               </PrivateRoute>
             }
           />
           <Route exact path="/programs" element={<PrivateRoute> <ProgramPage/> </PrivateRoute> }/>
           <Route
             path="/workoutcontributor"
             element={
               <PrivateRoute>
                 <ContributorWorkoutPage />
               </PrivateRoute>
              }
             />
             <Route
             path="/profile"
             element={
               <PrivateRoute>
                 <ProfilePage />
               </PrivateRoute>
             }
            />
            <Route
             path="/programcontributor"
             element={
               <PrivateRoute>
                 <ContributorProgramPage />
               </PrivateRoute>
             }
            />
           <Route
             path="/contribute/exercises"
             element={
               <PrivateRoute>
                 <ContributeExercisesPage />
               </PrivateRoute>
             }
           />
           <Route
             path="/set-goal"
             element={
               <PrivateRoute>
                 <SetGoalPage />
               </PrivateRoute>
             }
           />
         </Routes>
       </BrowserRouter>
     </ReactKeycloakProvider>
   </div>
 );
}

export default App;
