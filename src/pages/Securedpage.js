import { React, useEffect, useState } from 'react';
import keycloak from '../Keycloak';
import { APIURL } from "../API.js";


const Secured = () => {

  const [addresses,setAddresses] = useState([])

  const  apiTest = async () => {
    const response = await fetch(`${APIURL}api/Addresses/all`)
    const result = await response.json()
    console.log(result)
    setAddresses(result)

  }

  useEffect( () => {
    apiTest()

},[])

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