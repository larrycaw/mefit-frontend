import { useKeycloak } from "@react-keycloak/web";

const ProtectRoute = ({ children }) => {
 const { keycloak } = useKeycloak();

 const isLoggedIn = keycloak.authenticated;

 return isLoggedIn ? children : null;
};

export default ProtectRoute;