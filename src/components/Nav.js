import React, { useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { profileFetchAction, profileResetAction } from "../store/actions/profileActions";
import { useDispatch } from "react-redux";

const Nav = () => {
 const { keycloak, initialized } = useKeycloak();
 const dispatch = useDispatch();

 useEffect(() => {
    if (!keycloak.idTokenParsed)
      dispatch(profileResetAction());
    else{
      dispatch(profileFetchAction(keycloak.idTokenParsed.sub));
      console.log(keycloak.tokenParsed)
    }
 }, [keycloak.idTokenParsed]);


 return (
   <div>
     <div className="top-0 w-full flex flex-wrap">
       <section className="x-auto">
         <nav className="flex justify-between bg-gray-200 text-blue-800 w-screen">
           <div className="px-5 xl:px-12 py-6 flex w-full items-center">
             <h1 className="text-3xl font-bold font-heading">
               Keycloak React AUTH.
             </h1>
             <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
               <li>
                 <a className="hover:text-blue-800" href="/">
                   Home
                 </a>
               </li>
               <li>
                 <a className="hover:text-blue-800" href="/secured">
                   Secured Page
                 </a>
               </li>
               <li>
                 <a className="hover:text-blue-800" href="/workouts">
                   Workouts Page
                 </a>
               </li>
               <li>
                 <a className="hover:text-blue-800" href="/exercises">
                   Exercise Page
                 </a>
               </li>
               <li>
                 <a className="hover:text-blue-800" href="/programs">
                   Program Page
                 </a>
               </li>
               <li>
                 <a className="hover:text-blue-800" href="/workoutcontributor">
                   Workout Contributor Page
                 </a>
                 </li>
                <li>
                 <a className="hover:text-blue-800" href="/update-profile">
                   Update Profile Page
                 </a>
               </li>
               <li>
                 <a className="hover:text-blue-800" href="/programcontributor">
                   Program Contributor Page
                 </a>
               </li>
             </ul>
             <div className="hidden xl:flex items-center space-x-5">
               <div className="hover:text-gray-200">
                 {!keycloak.authenticated && (
                   <button
                     type="button"
                     className="text-blue-800"
                     onClick={() => keycloak.login()}
                   >
                     Login
                   </button>
                 )}

                 {!!keycloak.authenticated && (
                   <button
                     type="button"
                     className="text-blue-800"
                     onClick={() => keycloak.logout()}
                   >
                     Logout ({keycloak.tokenParsed.preferred_username})
                   </button>
                 )}
               </div>
             </div>
           </div>
         </nav>
       </section>
     </div>
   </div>
 );
};

export default Nav;