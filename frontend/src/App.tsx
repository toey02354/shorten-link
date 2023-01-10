import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [url, setUrl] = useState<string>("");
  const urlRef = useRef<HTMLInputElement>(null)

  const submitUrl = () => {
    if (urlRef.current?.value.length == 0) return console.log('invalid url')
    console.log(urlRef.current?.value.length);
  }

  return (
    <div className="App">
      <h1>Shorten URL exam</h1>
      <div className="shorten-form-wrapper">
        <input placeholder="enter url here" className="shorten-input" ref={urlRef}></input>
        <button type="submit" className="shorten-button" disabled={urlRef.current?.value.length == 0} onClick={submitUrl}>
          Shorten
        </button>
      </div>
    </div>
  );
}

export default App;
