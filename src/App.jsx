import React, { useContext } from "react";
import "./App.css";
import va from "../src/assets/ai.png";
import speekImage from "./assets/speak.gif";
import aigif from "./assets/aiVoice.gif";
import { FaMicrophone } from "react-icons/fa";
import { DataContext } from "./context/UserContext";

function App() {
  let {
    recognition,
    speeking,
    setSpeeking,
    prompt,
    setPrompt,
    response,
    setResponse,
  } = useContext(DataContext);
  return (
    <div className="main">
      <img src={va} id="sifra"></img>
      <h1>I'm Sifra2.O, Your Advanced vertial Assistant</h1>

      {!speeking ? (
        <button
          onClick={() => {
            setSpeeking(true);
            recognition.start();
            setResponse(false);
            setPrompt("listening...");
          }}
        >
          Click Here <FaMicrophone></FaMicrophone>
        </button>
      ) : (
        <div id="resImg">
          {!response ? (
            <img src={speekImage} id="speakImg"></img>
          ) : (
            <img src={aigif} id="aigif"></img>
          )}
          <p>{prompt}</p>
        </div>
      )}
    </div>
  );
}

export default App;
