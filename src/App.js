import React from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar"
import WelcomePage from "./pages/Homepage";
import SecuredPage from "./pages/Securedpage";
import Dashboard from "./components/Goals/Dashboard";
import NewGoal from "./components/Goals/NewGoal";
import GoalPage from "./components/Goals/GoalPage";
import GoalDetails from "./components/Goals/GoalDetails";
import WorkoutPage from "./components/Workouts/Workoutpage";
import ExercisePage from "./components/Exercises/Exercisepage"
import PrivateRoute from "./helpers/PrivateRoute";
import ProgramPage from "./components/Programs/ProgramPage";
import UpdateProfilePage from "./components/UpdateProfile/UpdateProfilePage";
import 'react-calendar/dist/Calendar.css';

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
                path="/goal-details"
                element={
                    <PrivateRoute>
                        <GoalDetails />
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
                path="/new-goal"
                element={
                    <PrivateRoute>
                        <NewGoal />
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
             path="/update-profile"
             element={
               <PrivateRoute>
                 <UpdateProfilePage />
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