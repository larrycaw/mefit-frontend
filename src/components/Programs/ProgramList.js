import { React } from "react";
import AppContainer from "../../helpers/AppContainer";

const ProgramList = (props) => {

    const handleProgramSelect = (programId) => {
        props.handleProgramSelect(programId);
    }

    let programList = props.programs.map((program) => {
        return(
            // <li key={program.id}>{program.name} <button onClick={() => {handleProgramSelect(program.id)}}>See details</button></li>
            <a class="list-group-item list-group-item-action" style={{background: '#7D9FE2'}} data-toggle="list" role="tab" onClick={() => {handleProgramSelect(program.id)}}>{program.name}</a>
        )
    })

  return (
        <AppContainer>
            <h2>All registered program:</h2>
                <div class="col-4">
                    <div class="list-group" id="list-tab" role="tablist" >
                        {props.programs.length > 0 ? programList : <span>No programs</span>}   
                    </div>
                </div>
        </AppContainer>
      )};

export default ProgramList;
