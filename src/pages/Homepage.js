import React, { useState } from 'react';
import { apiFetchAllAddresses } from '../api/AddresseAPI';


const Home = () => {
  const [address, setAddress] = useState([])

  const getAddresses =async () => {
    apiFetchAllAddresses()
      .then(response => console.log(response))
      // .then(data => {
      //   setAddress(data[0])
    }

  return (
    <main>
      <div>
        <h1 className="text-green-800 text-4xl">Welcome to the Homepage</h1>
      </div>
        <div>
        <button onClick={getAddresses}>Fetch all addresses</button>
      </div>
      <div>
      <h2>{address}</h2>
      </div>
    </main>
  );
};

export default Home;