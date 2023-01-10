import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Shorten URL exam</h1>
      <div className="shorten-form-wrapper">
        <input placeholder="enter url here" className="shorten-input"></input>
        <button type="submit" className="shorten-button">
          Shorten
        </button>
      </div>
    </div>
  );
}

export default App;
