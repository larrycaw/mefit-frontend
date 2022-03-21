import { React, useEffect, useState } from "react";
import { API_URL } from "../../API";
import ProgramList from "./ProgramList";
import SelectedProgram from "./SelectedProgram";
import { apiFetchAllPrograms } from "../../api/ProgramAPI";

const ProgramPage = () => {

  let [programs, setPrograms] = useState([]);
  let [selectedProgram, setSelectedProgram] = useState({});

  const getAllPrograms = async () => {
    await apiFetchAllPrograms()
      .then(response => response[1])
      .then(data => setPrograms(data))

  }

  useEffect(() => {
    getAllPrograms()
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
