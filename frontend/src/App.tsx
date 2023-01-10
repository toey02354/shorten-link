import { useRef, useState } from "react";
import "./App.css";

interface IMessage {
  isWrong: boolean;
  message: string;
}

// const shortenPath =
//   "https://pants-sea-lion.cyclic.app/shorten" || location.href;
const shortenPath = "http://localhost:4000/shorten" || location.href;

function App() {
  const [message, setMessage] = useState<IMessage>({
    isWrong: false,
    message: "",
  });
  const urlRef = useRef<HTMLInputElement>(null);

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const submitUrl = async () => {
    setMessage({
      isWrong: false,
      message: "creating short url, please wait...",
    });
    const fullUrl = urlRef.current?.value;

    if (!fullUrl || fullUrl.length == 0 || !isValidUrl(fullUrl)) {
      setMessage({ isWrong: true, message: "Invalid Url" });
      return;
    }

    try {
      console.log(fullUrl);
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
      const currPath = location.href;
      console.log(currPath.length - 1);
      const resultPath =
        currPath +
        (currPath.charAt(currPath.length - 1) == "/" ? result : "/" + result);
      console.log(resultPath);

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
          placeholder="https://example.com (must have valid scheme, e.g. http https)"
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
            <a
              href={message.message}
              target="_blank"
              className={message.isWrong ? "danger" : ""}
            >
              {message.message}
            </a>
          ) : undefined}
        </div>
      </div>
    </div>
  );
}

export default App;
