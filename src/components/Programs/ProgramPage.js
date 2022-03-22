import { React, useEffect, useState } from "react";
import { API_URL } from "../../API";
import ProgramList from "./ProgramList";
import SelectedProgram from "./SelectedProgram";
import AppContainer from "../../helpers/AppContainer";

const ProgramPage = () => {

    let [programs, setPrograms] = useState([]);
    let [selectedProgram, setSelectedProgram] = useState({});

  useEffect(() => {

    fetch(`${API_URL}api/MFProgram/all`, {
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

  return <AppContainer>
  <SelectedProgram program={selectedProgram}/>
  <br/><br/>
  <ProgramList programs={programs} handleProgramSelect={handleProgramSelect}/>
  </AppContainer>;
};

export default ProgramPage;
