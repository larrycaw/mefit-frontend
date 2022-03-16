import { React, useEffect, useState } from 'react';
import { APIURL } from "../API.js";

const Home = () => {
  const [address, setAddress] = useState([])

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
     <h1 className="text-green-800 text-4xl">Welcome to the Homepage</h1>
   </div>
 );
};

export default Home;