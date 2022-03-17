import { React } from "react";

const ProgramList = (props) => {

    const handleProgramSelect = (programId) => {
        props.handleProgramSelect(programId);
    }

    let programList = props.programs.map((program) => {
        return(
            <li key={program.id}>{program.name} <button onClick={() => {handleProgramSelect(program.id)}}>See details</button></li>
        )
    })

  return <div>
      <h1>All programs:</h1>
      {props.programs.length > 0 ? programList : <span>No programs</span>}
      </div>;
};

export default ProgramList;
