import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
 url: "https://kc-an-so-ih.herokuapp.com/auth",
 realm: "test",
 clientId: "heroku",
});

export default keycloak;