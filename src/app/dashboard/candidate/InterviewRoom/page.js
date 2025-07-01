"use client";
import React, { useEffect, useState, useRef } from "react";

const Dictaphone = () => {
    const [interimTranscript, setInterimTranscript] = useState("");
    const [fullTranscript, setFullTranscript] = useState("");
    const [aiReply, setAiReply] = useState("Hi, I'm your AI interviewer 👋. Let's get started!");
    const [listening, setListening] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const recognitionRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const intervalRef = useRef(null);

    const speakText = (text) => {
        if (!window.speechSynthesis) {
            setError("Text-to-speech is not supported in this browser.");
            return;
        }
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);

        const voices = synth.getVoices();
        const preferredVoice = voices.find(
            voice => voice.name.includes("Google US English") || voice.name.includes("Microsoft") || voice.default
        );
        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.lang = "en-US";
        utterance.rate = 0.95;
        utterance.pitch = 1.1;
        utterance.volume = 1;

        utterance.onstart = () => setIsLoading(true);
        utterance.onend = () => setIsLoading(false);

        synth.cancel();
        synth.speak(utterance);
    };

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setError("Your browser does not support Speech Recognition. Try typing your responses instead.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event) => {
            let interim = "";
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                const transcriptChunk = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    setFullTranscript((prev) => prev + transcriptChunk.trim() + ". ");
                } else {
                    interim += transcriptChunk;
                }
            }
            setInterimTranscript(interim);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            setError(`Speech recognition error: ${event.error}`);
            setListening(false);
        };

        recognition.onend = () => {
            if (listening) recognition.start();
        };

        recognitionRef.current = recognition;

        return () => {
            recognition.stop();
        };
    }, [listening]);

    useEffect(() => {
        let stream = null;
        const initCamera = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Camera access denied:", err);
                setError("Camera access denied. Please allow camera access to continue.");
            }
        };
        initCamera();
        speakText("Camera is ready. You can start the interview by clicking the Start button.");
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    useEffect(() => {
        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);

    const startListening = () => {
        if (!recognitionRef.current) return;
        try {
            recognitionRef.current.stop();
            recognitionRef.current.start();
            setListening(true);
            setError("");
            clearInterval(intervalRef.current);
            intervalRef.current = setInterval(captureAndSendImage, 20000);
            speakText("Hi, I'm your AI interviewer. Let's get started!");
        } catch (err) {
            console.error("Error restarting recognition:", err);
            setError("Failed to start listening. Please try again.");
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setListening(false);
            clearInterval(intervalRef.current);
        }
    };

    const resetTranscript = () => {
        setInterimTranscript("");
        setFullTranscript("");
        setAiReply("Hi, I'm your AI interviewer 👋. Let's get started!");
        setError("");
    };

    const sendTranscript = async () => {
        if (!fullTranscript.trim()) return;
        setIsLoading(true);
        try {
            const res = await fetch("/api/audio-transcribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ transcript: fullTranscript.trim() }),
            });
            if (!res.ok) throw new Error("Failed to fetch AI reply");
            const data = await res.json();
            const replyText = data.reply || "No reply from AI.";
            setFullTranscript("");
            setAiReply(replyText);
            speakText(replyText);
        } catch (err) {
            console.error("Transcript submission failed:", err);
            setAiReply("❌ Failed to get AI reply.");
            setError("Failed to connect to the server.");
        } finally {
            setIsLoading(false);
        }
    };

    const captureAndSendImage = async () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;
        const width = video.videoWidth;
        const height = video.videoHeight;
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, width, height);
        const imageData = canvas.toDataURL("image/jpeg", 0.95);
        try {
            const res = await fetch("/api/upload-image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image: imageData }),
            });
            if (!res.ok) throw new Error("Failed to upload image");
            const data = await res.json();
            console.log("Image sent:", data);
        } catch (err) {
            console.error("Image upload failed:", err);
            setError("Failed to upload image.");
        }
    };


    const Card = ({ title, children, className = "" }) => (
        <div className={`bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-2xl border border-gray-700 shadow-lg transition-all duration-300 hover:shadow-xl ${className}`}>
            <h4 className="text-lg font-bold mb-3 text-blue-400 flex items-center">
                <span className="mr-2">{title.icon}</span>
                {title.text}
            </h4>
            <div className="text-sm text-gray-200 whitespace-pre-wrap">{children}</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
            <div className="max-w-5xl mx-auto">
                <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-700 shadow-2xl">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                            🎤 AI Interview Panel
                        </h1>
                        <div className={`px-4 py-2 rounded-full text-sm font-bold flex items-center ${listening ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            <span className={`mr-2 ${listening ? 'animate-pulse' : ''}`}>
                                {listening ? "●" : "○"}
                            </span>
                            {listening ? "Listening..." : "Not Listening"}
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-900/50 border-l-4 border-red-500 p-4 mb-6 rounded-xl">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <p className="text-red-200">{error}</p>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        <div className="lg:col-span-2">
                            <div className="relative bg-gray-900 rounded-2xl overflow-hidden border-4 border-blue-500/30 shadow-xl">
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    muted
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                    <div className="bg-blue-500/20 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center">
                                        <svg className="w-10 h-10 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <button
                                onClick={startListening}
                                disabled={isLoading}
                                className={`w-full py-4 rounded-xl text-lg font-bold transition-all duration-200 transform ${isLoading ? 'bg-blue-600/50' : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'} flex items-center justify-center`}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Loading...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Start Interview
                                    </>
                                )}
                            </button>

                            <button
                                onClick={stopListening}
                                className="w-full py-4 rounded-xl text-lg font-bold bg-red-600 hover:bg-red-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
                            >
                                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                                </svg>
                                Stop Interview
                            </button>

                            <button
                                onClick={resetTranscript}
                                className="w-full py-4 rounded-xl text-lg font-bold bg-gray-700 hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
                            >
                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Reset Transcript
                            </button>

                            <button
                                onClick={sendTranscript}
                                disabled={!fullTranscript.trim() || isLoading}
                                className={`w-full py-4 rounded-xl text-lg font-bold transition-all duration-200 transform ${fullTranscript.trim() && !isLoading ? 'bg-purple-600 hover:bg-purple-700 hover:scale-105' : 'bg-gray-600 cursor-not-allowed'} flex items-center justify-center`}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                        Send Transcript
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Card
                            title={{ icon: "🎙️", text: "Your Speech" }}
                            className="border-blue-500/50"
                        >
                            {interimTranscript || <span className="text-gray-500">Your speech will appear here as you speak...</span>}
                        </Card>

                        <Card
                            title={{ icon: "📝", text: "Transcript" }}
                            className="border-green-500/50"
                        >
                            {fullTranscript || <span className="text-gray-500">Your complete sentences will appear here...</span>}
                        </Card>

                        <Card
                            title={{ icon: "🤖", text: "AI Interviewer" }}
                            className="border-purple-500/50"
                        >
                            {aiReply}
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dictaphone;
