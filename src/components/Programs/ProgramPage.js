import { React, useEffect, useState } from "react";
import { APIURL } from "../../API";
import ProgramList from "./ProgramList";
import SelectedProgram from "./SelectedProgram";

const ProgramPage = () => {

    let [programs, setPrograms] = useState([]);
    let [selectedProgram, setSelectedProgram] = useState({});

  useEffect(() => {

    fetch(`${APIURL}api/MFProgram/all`, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) => {
        setPrograms(result);
        console.log(result)
      })
      .catch((e) => {
        console.log(e);
      });

  }, []);

  const handleProgramSelect = (programId) => {
    setSelectedProgram(programs.find(p => p.id === programId))
  }

  return <>
  <SelectedProgram program={selectedProgram}/>
  <br/><br/>
  <ProgramList programs={programs} handleProgramSelect={handleProgramSelect}/>
  </>;
};

export default ProgramPage;
