import { useEffect, useRef } from "react";
import AppContainer from "../../helpers/AppContainer";

const SelectedProgram = (props) => {

  if (!props.program.workouts) return <></>;

  else {

      let workoutList = props.program.workoutNames.map((workout, i) => {
          return(<li key={i}>{workout}</li>)
      })

    return (
      <AppContainer>
        <h1>{props.program.name}</h1>
        <h2>Workouts in program:</h2>
        {props.program.workoutNames ? (workoutList) : (<i>No workouts in program</i>)}
      </AppContainer>
    );
  }
};

export default SelectedProgram;
