import { useKeycloak } from "@react-keycloak/web";

const ProtectRoute = ({ children }) => {
    // Only renders children if user is logged in
 const { keycloak } = useKeycloak();

 const isLoggedIn = keycloak.authenticated;

 return isLoggedIn ? children : null;
};

export default ProtectRoute;