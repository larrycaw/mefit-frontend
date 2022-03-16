import { React, useEffect, useState } from 'react';


const Home = () => {
  const [address, setAddress] = useState([])

  const [addresses,setAddresses] = useState([])

  const  apiTest = async () => {
    const response = await fetch('https://localhost:44389/api/Addresses/all')
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