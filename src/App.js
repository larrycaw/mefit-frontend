import React from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import WelcomePage from "./pages/Homepage";
import SecuredPage from "./pages/Securedpage";
import WorkoutPage from "./components/Workouts/Workoutpage";
import ExercisePage from "./components/Exercises/Exercisepage"
import PrivateRoute from "./helpers/PrivateRoute";
import ProgramPage from "./components/Programs/ProgramPage";
import UpdateProfilePage from "./components/UpdateProfile/UpdateProfilePage";

function App() {
 return (
   <div>
     <ReactKeycloakProvider authClient={keycloak}>
       <Nav />
       <BrowserRouter>
         <Routes>
           <Route exact path="/" element={<WelcomePage />} />
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