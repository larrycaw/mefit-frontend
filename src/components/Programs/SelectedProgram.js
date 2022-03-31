import AppContainer from "../../helpers/AppContainer";


const SelectedProgram = (props) => {
  // Shows details for selected program

  // Empty if no program is selected
  if (!props.program.workouts) return <></>;

  else {

      let workoutList = props.program.workoutNames.map((workout) => {
          return(
            <div className="tab-pane fade show active">
              Workout: {workout}
            </div>
          )
      })

      let programNameList = (program) => {
          return (
            <div className="tab-pane fade show active">
              Selected program: {program.name}
            </div>
          )
      }
      

    return (
      <AppContainer>
        <div className="row">
          <div className="col-8">
            <div className="tab-content" id="nav-tabContent">
              {props.program.name ? (programNameList(props.program)) : (<i>No name in program</i>)}
            </div>
            <div className="tab-content" id="nav-tabContent">
              {props.program.workoutNames ? (workoutList) : (<i>No workouts in program</i>)}
            </div>
          </div>
        </div>
      </AppContainer>
    );
  }
};

export default SelectedProgram;
