import { React } from "react";
import AppContainer from "../../helpers/AppContainer";

const ProgramList = (props) => {
    // Component with list of programs

    const handleProgramSelect = (programId) => {
        props.handleProgramSelect(programId);
    }

    let programList = props.programs.map((program) => {
        return(
            <a className="list-group-item list-group-item-action" style={{background: '#7D9FE2'}} data-toggle="list" role="tab" onClick={() => {handleProgramSelect(program.id)}}>{program.name}</a>
        )
    })

  return (
        <AppContainer>
            <h2>All registered program:</h2>
                <div className="col-4">
                    <div className="list-group" id="list-tab" role="tablist" >
                        {props.programs.length > 0 ? programList : <span>No programs</span>}   
                    </div>
                </div>
        </AppContainer>
      )};

export default ProgramList;
