import { AudioLines, Mic } from "lucide-react";
import { useEffect, useState } from "react";

import useMusicStore from "../stores/useMusicStore";
import usePlayerStore from "../stores/usePlayerStore";
import { speak } from "../hooks/useSpeechRecognition";
import useSpeechRecognition from "../hooks/useSpeechRecognition";

const VoiceControl = () => {
  const { setCurrentSong, playNext, playPrevious, togglePlay } =
    usePlayerStore();
  const [waitingForWakeWord, setWaitingForWakeWord] = useState(true);
  const { songs } = useMusicStore();

  const [recognizedText, setRecognizedText] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleCommand = (command: string) => {
    // console.log("Recognized Command:", command);
    setRecognizedText(command);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);

    const lowerCommand = command.toLowerCase().trim();

    if (waitingForWakeWord) {
      if (
        /^hey remix\b/.test(lowerCommand) &&
        lowerCommand.trim() === "hey remix"
      ) {
        speak("I'm listening...");
        setWaitingForWakeWord(false);
        return;
      }
    }

    // play song detection
    const playMatch = lowerCommand.match(/(?:hey remix\s*)?play\s+(.*)/i);
    if (playMatch) {
      const songName = playMatch[1].trim();
      // console.log("Detected Song:", songName);

      const song = songs.find((s) => s.title.toLowerCase().includes(songName));
      if (song) {
        setCurrentSong(song);
        speak(`Playing ${song.title}`);
      } else {
        speak("Sorry, I couldn't find that song.");
      }
      return;
    }

    // next song detection
    if (/next|skip/i.test(lowerCommand)) {
      playNext();
      speak("Playing next song.");
      return;
    }

    // prev song detection
    if (/previous|back/i.test(lowerCommand)) {
      playPrevious();
      speak("Playing previous song.");
      return;
    }

    // pause detection
    if (/pause|stop( music)?/i.test(lowerCommand)) {
      togglePlay();
      speak("Music paused.");
      return;
    }

    // resume detection
    if (/resume|continue|start/i.test(lowerCommand)) {
      togglePlay();
      speak("Music resumed.");
      return;
    }

    speak("Sorry, I didn't understand that command.");
    setWaitingForWakeWord(true);
  };

  const { startListening, isListening } = useSpeechRecognition(handleCommand);

  // handle spacebar for laptops
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        startListening();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [startListening]);

  if (isListening)
    return (
      <div className="flex justify-center items-center gap-2 mt-2 -mb-3 transition-transform animate-pulse">
        <AudioLines /> <span className="mr-2">Listening...</span>
      </div>
    );

  return (
    showPopup &&
    recognizedText && (
      <div className="fixed inset-0 flex justify-center items-center z-50">
        {/* Recognized Command Popup */}
        <div className="bg-neutral-50 text-neutral-950 px-4 py-3 rounded-lg shadow-md transition-opacity duration-300 z-10 font-medium flex items-center gap-1">
          <span className="flex items-center">
            {" "}
            <Mic size={20} className="font-bold " />:
          </span>
          <span className="italic mr-1">
            "{recognizedText.replace("remix", "rymix")}"
          </span>
        </div>
      </div>
    )
  );
};

export default VoiceControl;
