import { useEffect, useRef } from "react";
import AppContainer from "../../helpers/AppContainer";

const SelectedProgram = (props) => {

  if (!props.program.workouts) return <></>;

  else {

      let workoutList = props.program.workoutNames.map((workout, i) => {
          // return(<li key={i}>
          //   {workout}
          // </li>)
          return(
            <div className="tab-pane fade show active">
              Workout: {workout}
            </div>
          )
      })

    return (
      <AppContainer>
        {/* <h1>{props.program.name}</h1>
        <h2>Workouts in program:</h2>
        {props.program.workoutNames ? (workoutList) : (<i>No workouts in program</i>)} */}
        <div class="row">
          <div class="col-8">
            <div class="tab-content" id="nav-tabContent">
              {props.program.workoutNames ? (workoutList) : (<i>No workouts in program</i>)}
            </div>

          </div>
        </div>
      </AppContainer>
    );
  }
};

export default SelectedProgram;
