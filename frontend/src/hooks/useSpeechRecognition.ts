import { useState, useEffect } from "react";
import { toast } from "sonner";

const useSpeechRecognition = (onCommand: (command: string) => void) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      toast.error("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("⚠️ Speech Recognition Error:", event.error);
    };

    recognition.onresult = (event: any) => {
      const result = event.results[0][0].transcript.toLowerCase();
      setTranscript(result);
      onCommand(result);
    };

    if (isListening) {
      recognition.start();
    }

    return () => recognition.stop();
  }, [isListening]);

  return {
    transcript,
    isListening,
    startListening: () => {
      setIsListening(true);
    },
  };
};

export const speak = (message: string) => {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = "en-US";
  utterance.rate = 1; // Normal speed
  synth.speak(utterance);
};

export default useSpeechRecognition;
