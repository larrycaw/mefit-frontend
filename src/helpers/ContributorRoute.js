import { NavLink } from 'react-router-dom'
import keycloak from "../Keycloak";
import AppContainer from "./AppContainer";

const ContributorRoute = ({ children }) => {
const isContributor = keycloak.tokenParsed.user_role.includes("Contributor");
 
 return isContributor ? children : (
 <AppContainer>
     <h1 className="display-3 m-4 pt-5">This page is only for contributors and admins.</h1>
     <div className="d-flex justify-content-center">
     <NavLink className="nav-link" to="/"><button className="btn btn-primary btn-lg btn-block mt-5">Go back to dashboard</button></NavLink>
     </div>
     </AppContainer>
 );
};

export default ContributorRoute;