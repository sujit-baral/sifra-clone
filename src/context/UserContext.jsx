import React, { createContext, useState } from "react";
import run from "../gemini";

// Create context
export const DataContext = createContext();

export default function UserContext({ children }) {
  let [speeking, setSpeeking] = useState(false);
  let [prompt, setPrompt] = useState("listening");
  let [response, setResponse] = useState(false);

  function speak(text) {
    let textSpeak = new SpeechSynthesisUtterance(text);
    console.log(textSpeak);
    textSpeak.volume = 1;
    textSpeak.pitch = 1;
    textSpeak.rate = 1;
    textSpeak.lang = "hi-GB";

    window.speechSynthesis.speak(textSpeak);
  }

  function reSetAll() {
    setResponse(true);
    setTimeout(() => setSpeeking(false), 5000);
  }
  async function aiResponse(prompt) {
    let text = await run(prompt);
    let newText1 = text.replace(/\*+/g, "");
    let newText = newText1.replace("Google", "Subham");

    console.log(newText);
    setPrompt(newText);
    speak(newText);
    setResponse(true);
    setTimeout(() => setSpeeking(false), 5000);
  }

  let speechRecognition =
    window.speechRecognition || window.webkitSpeechRecognition;
  let recognition = new speechRecognition();
  recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    console.log(transcript);
    setPrompt(transcript);

    takeCommand(transcript.toLowerCase());
  };

  function takeCommand(message) {
    if (message.includes("hello") || message.includes("hey")) {
      speak("hello Sir,how can i help you?");
      setPrompt("hello Sir,how can i help you?");
      reSetAll();
    } else if (
      message.includes("who is subham") ||
      message.includes("who is shubham")
    ) {
      speak("A btech student,who created me ...");
      setPrompt("A btech student,who created me ...");

      reSetAll();
    } else if (message.includes("open youtube")) {
      speak("opening youtube...");
      window.open("https://www.youtube.com/", "_blank");
      setPrompt("opening youtube...");
      reSetAll();
    } else if (message.includes("open google")) {
      speak("opening google...");
      window.open("https://google.com/", "_blank");
      setPrompt("opening google...");

      reSetAll();
    } else if (message.includes("open facebook")) {
      speak("opening facebook...");
      window.open("https://facebook.com/", "_blank");
      setPrompt("opening facebook...");

      reSetAll();
    } else if (message.includes("open instagram")) {
      speak("opening instagram...");
      window.open("https://instagram.com/", "_blank");
      setPrompt("opening Instagram...");

      reSetAll();
    } else if (message.includes("open calculator")) {
      speak("opening calculator..");
      window.open("calculator://");
      setPrompt("opening calculator...");

      reSetAll();
    } else if (message.includes("open whatsapp")) {
      speak("opening whatsapp..");
      window.open("whatsapp://");
      setPrompt("opening whatsapp...");

      reSetAll();
    } else if (message.includes("open")) {
      let text = message.replace("open ", "");
      speak(`opening ${text} ...`);
      window.open(`https://${text}.com/`, "_blank");
      setPrompt(`opening ${text}...`);

      reSetAll();
    } else {
      aiResponse(message);
    }
  }

  const value = {
    recognition,
    speeking,
    setSpeeking,
    prompt,
    setPrompt,
    response,
    setResponse,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
