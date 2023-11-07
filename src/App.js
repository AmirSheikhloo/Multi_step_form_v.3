import "./App.css";
import { useContext } from "react";
import FirstStep from "./components/FirstStep";
import SecondStep from "./components/SecondStep";
import ThirdStep from "./components/ThirdStep";
import { Stepper, StepLabel, Step } from "@mui/material";
import { multiStepContext } from "./components/StepContext";
import DisplayData from "./components/DisplayData";

function App() {
  const { currentStep, finalData } = useContext(multiStepContext);
  function showStep(step) {
    console.log(step);
    switch (step) {
      case 1:
        return <FirstStep />;
      case 2:
        return <SecondStep />;
      case 3:
        return <ThirdStep />;
    }
  }
  return (
    <div className="App">
      <div className="App-header">
        <h3 style={{ color: "red" }}>Multi Step Application</h3>
        <div className="center-stepper">
          <Stepper
            style={{ width: "18%" }}
            activeStep={currentStep - 1}
            orientation="horizontal"
          >
            <Step>
              <StepLabel></StepLabel>
            </Step>
            <Step>
              <StepLabel></StepLabel>
            </Step>
            <Step>
              <StepLabel></StepLabel>
            </Step>
          </Stepper>
        </div>
        {showStep(currentStep)}
        <br />
        {finalData.length > 0 ? <DisplayData /> : ''}
      </div>
    </div>
  );
}

export default App;
