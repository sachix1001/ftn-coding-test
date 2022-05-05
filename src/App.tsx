import React, { useEffect } from "react";
// import styled from "styled-components";
import "./App.css";

const Question: { [key: string]: string } = {
  setTime:
    "Please input the amount of time in seconds between emitting numbers and their frequency",
  firstNumber: "Please enter the first number",
  nextNumber: "Please enter the next number",
  quit: "Thanks for playing.",
};

const timerState: { [key: string]: string } = {
  halt: "Timer halted",
  resume: "Timer resumed",
};

interface Frequency {
  [key: string]: number;
}

function App() {
  const [questionKey, setQuestionKey] = React.useState<keyof typeof Question>(
    "setTime"
  );
  const [text, setText] = React.useState<string>("");
  const [numbers, setNumbers] = React.useState<Frequency | "">("");
  const [time, setTime] = React.useState<number>(0);
  const [input, setInput] = React.useState<number | "">("");
  const [timerPause, setTimerPause] = React.useState<boolean>(true);

  useEffect(() => {
    if (timerPause) return;
    const interval = setInterval(() => {
      if (!numbers) return;
      setText(JSON.stringify(sortNumbers()));
    }, time * 1000);

    return () => clearInterval(interval);
  }, [time, timerPause, numbers]);

  const sortNumbers = () => {
    return Object.entries(numbers).sort((a, b) => b[1] - a[1]);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((value) =>
      e.target.validity.valid ? Number(e.target.value) : value
    );
  };

  const handleEnter = (e: React.MouseEvent<HTMLElement>) => {
    switch (questionKey) {
      // set printing frequency
      case "setTime":
        if (!input) break;
        setTime(input);
        setTimerPause(false);
        setQuestionKey("firstNumber");
        setInput("");
        break;

      // update input number to frequency dictionary
      case "firstNumber":
        if (!input) break;
        setNumbers({ [input]: 1 });
        checkFibonacci();
        setQuestionKey("nextNumber");
        setInput("");
        break;

      // update input number to frequency dictionary
      // copy frequency obj to trigger state update
      case "nextNumber":
        if (!input) break;
        if (!numbers) {
          setNumbers({ [input]: 1 });
        } else {
          const incrementedFrequency = { ...numbers };
          incrementedFrequency[input] = incrementedFrequency[input] + 1 || 1;
          setNumbers(incrementedFrequency);
        }
        checkFibonacci();
        setInput("");
        break;
    }
  };

  const handleHalt = () => {
    setText(timerState.halt);
    setTimerPause(true);
  };
  const handleResume = () => {
    setText(timerState.resume);
    setTimerPause(false);
  };
  const handleQuite = () => {
    setQuestionKey("quit");
    setTimerPause(true);
    setText(JSON.stringify(sortNumbers()));
  };

  // array of first 1000 fibonacci numbers
  const fibonacci1000 = fibonacci(1000);
  const checkFibonacci = () => {
    if (!input) return;
    if (fibonacci1000.includes(input)) setText("FIB");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h5>{Question[questionKey]}</h5>
        <h5>{text}</h5>
        <input
          onChange={handleInput}
          value={input}
          type="text"
          pattern="[0-9]*"
        ></input>
        <button onClick={handleEnter}>Enter</button>
        <button onClick={handleHalt}>Halt</button>
        <button onClick={handleResume}>Resume</button>
        <button onClick={handleQuite}>Quit</button>
      </header>
    </div>
  );
}

// return 'num' number of fibonacci sequence array
const fibonacci = (num: number): number[] => {
  const sequence = [0, 1];
  for (let i = 2; i <= num; i++) {
    sequence[i] = sequence[i - 2] + sequence[i - 1];
  }
  return sequence;
};

export default App;
