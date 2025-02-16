import { useEffect, useRef } from "react";

import usePlayerStore from "../stores/usePlayerStore";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);
  const { currentSong, isPlaying, playNext } = usePlayerStore();

  // handle play/pause
  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying]);

  // handle song ends
  useEffect(() => {
    const audio = audioRef.current;

    const handleSongEnd = () => {
      playNext();
    };

    audio?.addEventListener("ended", handleSongEnd);

    return () => audio?.removeEventListener("ended", handleSongEnd);
  }, [playNext]);

  // handle song changes
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    const audio = audioRef.current;

    // check if it is actually a new song
    const isSongChange = prevSongRef.current !== currentSong?.audioURL;
    if (isSongChange) {
      audio.src = currentSong?.audioURL;

      // reset playback position
      audio.currentTime = 0;

      prevSongRef.current = currentSong?.audioURL;
      if (isPlaying) audio.play();
    }
  }, [currentSong, isPlaying]);

  return <audio ref={audioRef} />;
};

export default AudioPlayer;
