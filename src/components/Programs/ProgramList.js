import { React } from "react";
import AppContainer from "../../helpers/AppContainer";

const ProgramList = (props) => {

    const handleProgramSelect = (programId) => {
        props.handleProgramSelect(programId);
    }

    let programList = props.programs.map((program) => {
        return(
            <li key={program.id}>{program.name} <button onClick={() => {handleProgramSelect(program.id)}}>See details</button></li>
        )
    })

  return (
        <AppContainer>
            <h1>All programs:</h1>
            {props.programs.length > 0 ? programList : <span>No programs</span>}
        </AppContainer>
      )};

export default ProgramList;
