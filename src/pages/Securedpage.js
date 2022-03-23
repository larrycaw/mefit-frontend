import { React, useEffect, useState } from 'react';
import keycloak from '../Keycloak';
import { API_URL } from "../API.js";
import AppContainer from "../helpers/AppContainer";

const Secured = () => {

  const [addresses,setAddresses] = useState([])

  const  apiTest = async () => {
    const response = await fetch(`${API_URL}api/Addresses/all`)
    const result = await response.json()
    console.log(result)
    setAddresses(result)

  }

  useEffect( () => {
    apiTest()

},[])

 return (
   <AppContainer>
     <h1 className="text-black text-4xl">Welcome to the Protected Page.</h1>
     <h1>{keycloak.idTokenParsed['preferred_username']}</h1>
     <h1>{keycloak.idTokenParsed.email}</h1>
     <h1>{keycloak.idTokenParsed['email']}</h1>
   </AppContainer>
 );
};

export default Secured;