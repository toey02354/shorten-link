import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

interface IMessage {
  isWrong: boolean;
  message: string;
}

const shortenPath =
  "https://pants-sea-lion.cyclic.app/shorten" || location.href;
// const shortenath = "http://localhost:4000/shorten" || location.href;

function App() {
  const [message, setMessage] = useState<IMessage>({
    isWrong: false,
    message: "",
  });
  const urlRef = useRef<HTMLInputElement>(null);

  const submitUrl = async () => {
    setMessage({
      isWrong: false,
      message: "creating short url, please wait...",
    });
    const fullUrl = urlRef.current?.value;
    // console.log(fullUrl);

    if (!fullUrl || fullUrl.length == 0) {
      setMessage({ isWrong: true, message: "Invalid Url" });
      return;
    }

    try {
      const result = await (
        await fetch(shortenPath, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullUrl: fullUrl,
          }),
        })
      ).text();
      // console.log(result);
      const resultPath = location.href + "/" + result;
      setMessage({ isWrong: false, message: resultPath });
    } catch (error) {
      // console.log(error);
      setMessage({ isWrong: true, message: "Something went wrong" });
    }
  };

  return (
    <div className="App">
      <h1>Shorten URL exam</h1>
      <div className="shorten-form-wrapper">
        <input
          placeholder="enter url here"
          className="shorten-input"
          ref={urlRef}
        ></input>
        <button
          type="submit"
          className="shorten-button"
          disabled={urlRef.current?.value.length == 0}
          onClick={submitUrl}
        >
          Shorten
        </button>
        <div className="result-container">
          <div className="result-placeholder">Result:</div>{" "}
          {message.message.length > 0 ? (
            <div className={message.isWrong ? "danger" : ""}>
              {message.message}
            </div>
          ) : undefined}
        </div>
      </div>
    </div>
  );
}

export default App;
