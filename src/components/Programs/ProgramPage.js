import { React, useEffect, useState } from "react";
import { apiFetchAllPrograms } from "../../api/ProgramAPI";
import ProgramList from "./ProgramList";
import SelectedProgram from "./SelectedProgram";
import AppContainer from "../../helpers/AppContainer";
import 'bootstrap/dist/css/bootstrap.css';

const ProgramPage = () => {

  let [programs, setPrograms] = useState([]);
  let [selectedProgram, setSelectedProgram] = useState({});

    const getPrograms = async () => {
      await apiFetchAllPrograms()
      .then (result => result[1])
      .then((data) => {
        setPrograms(data);
      })
    }

  useEffect(() => {
      getPrograms();
  }, []);

  const handleProgramSelect = (programId) => {
    setSelectedProgram(programs.find(p => p.id === programId))
  }

  return (
    <AppContainer>
      <br/><br/>
      <ProgramList programs={programs} handleProgramSelect={handleProgramSelect}/>
      <SelectedProgram program={selectedProgram}/>
    </AppContainer>
  ) 
};

export default ProgramPage;
