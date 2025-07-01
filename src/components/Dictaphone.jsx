// components/Dictaphone.js
"use client";
import React, { useEffect, useState, useRef } from "react";

const Dictaphone = () => {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Initialize speech recognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        interimTranscript += event.results[i][0].transcript;
      }
      setTranscript(interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      if (listening) recognition.start(); // restart if listening
    };

    recognitionRef.current = recognition;
  }, [listening]);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  const resetTranscript = () => {
    setTranscript("");
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        color: "white",
        backgroundColor: "#222",
        borderRadius: "10px",
      }}
    >
      <h2>🎤 Web Speech API Demo</h2>
      <p>
        <strong>Status:</strong>{" "}
        {listening ? "🎧 Listening..." : "🔴 Not listening"}
      </p>

      <button onClick={startListening}>Start</button>
      <button onClick={stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#333",
          borderRadius: "5px",
        }}
      >
        <p>
          {transcript || "Say something and your words will appear here..."}
        </p>
      </div>
    </div>
  );
};

export default Dictaphone;
