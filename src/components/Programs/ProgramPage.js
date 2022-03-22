import { React, useEffect, useState } from "react";
import { apiFetchAllPrograms } from "../../api/ProgramAPI";
import ProgramList from "./ProgramList";
import SelectedProgram from "./SelectedProgram";

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

  return <>
  <SelectedProgram program={selectedProgram}/>
  <br/><br/>
  <ProgramList programs={programs} handleProgramSelect={handleProgramSelect}/>
  </>;
};

export default ProgramPage;
