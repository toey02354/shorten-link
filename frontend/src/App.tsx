import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

interface IMessage {
  isWrong: boolean,
  message: string
}

const path = 'https://pants-sea-lion.cyclic.app/' || location.href

function App() {
  const [message, setMessage] = useState<IMessage>({isWrong: false, message: ""});
  const urlRef = useRef<HTMLInputElement>(null)

  const submitUrl = async () => {
    
    if (urlRef.current?.value.length == 0) {
      setMessage({ isWrong: true, message: "Invalid Url" })
      return
    }
    setMessage({ isWrong: false, message: "" })
    const result = await fetch(path, {method: "GET"}).then(res => res.json())
    console.log(result);
    
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
        {message.message.length > 0 ? <p className={message.isWrong?"danger":""}>{message.message}</p> : undefined}
      </div>
    </div>
  );
}

export default App;
