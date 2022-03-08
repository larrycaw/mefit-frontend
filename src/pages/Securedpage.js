import React from 'react';
import keycloak from '../Keycloak';


const Secured = () => {

 return (
   <div>
     <h1 className="text-black text-4xl">Welcome to the Protected Page.</h1>
     <h1>{keycloak.idTokenParsed['preferred_username']}</h1>
     <h1>{keycloak.idTokenParsed.email}</h1>
     <h1>{keycloak.idTokenParsed['email']}</h1>
   </div>
 );
};

export default Secured;