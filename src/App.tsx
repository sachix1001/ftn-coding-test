import React from "react";
// import styled from "styled-components";
import "./App.css";

const DisplayText: { [key: string]: string } = {
  setTime:
    "Please input the amount of time in seconds between emitting numbers and their frequency",
  firstNumber: "Please enter the first number",
  nextNumber: "Please enter the next number",
  halt: "Timer halted",
  resume: "Timer resumed",
  quit: "Thanks for playing, press any key to exit.",
};

interface Frequency {
  [key: string]: number;
}

function App() {
  const [textKey, setTextKey] = React.useState<keyof typeof DisplayText>(
    "setTime"
  );
  const [frequency, setFrequency] = React.useState<Frequency | undefined>(
    undefined
  );
  const [time, setTime] = React.useState<number>(0);
  const [input, setInput] = React.useState<number | undefined>();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((value) =>
      e.target.validity.valid ? Number(e.target.value) : value
    );
  };

  const handleEnter = (e: React.MouseEvent<HTMLElement>) => {
    switch (textKey) {
      // set printing frequency
      case "setTime":
        if (input) setTime(input);
        setTextKey("firstNumber");
        setInput(undefined);
        break;

      // update input number to frequency dictionary
      case "firstNumber":
        if (input) setFrequency({ input: 1 });
        setTextKey("nextNumber");
        setInput(undefined);
        break;

      // update input number to frequency dictionary
      // copy frequency obj to trigger state update
      case "nextNumber":
        if (input && frequency) {
          const incrementedFrequency = { ...frequency };
          incrementedFrequency[input] = (incrementedFrequency[input] + 1) | 1;
          setFrequency(incrementedFrequency);
        }
        setInput(undefined);
        break;
    }
  };

  const handleHalt = () => {
    setTextKey("halt");
  };
  const handleResume = () => {
    setTextKey("resume");
  };
  const handleQuite = () => {
    setTextKey("quit");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h5>{DisplayText[textKey]}</h5>
        <h5>{JSON.stringify(frequency)}</h5>
        <input onChange={handleInput} type="text" pattern="[0-9]*"></input>
        <button onClick={handleEnter}>Enter</button>
        <button onClick={handleHalt}>Halt</button>
        <button onClick={handleResume}>Resume</button>
        <button onClick={handleQuite}>Quit</button>
      </header>
    </div>
  );
}

export default App;
