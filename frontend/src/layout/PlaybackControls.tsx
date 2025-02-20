import { useEffect, useRef, useState } from "react";
import {
  Shuffle,
  SkipBack,
  SkipForward,
  Squircle,
  Triangle,
} from "lucide-react";

import usePlayerStore from "../stores/usePlayerStore";
import VolumeControl from "./components/VolumeControl";
import ProgressSlider from "./components/ProgressSlider";
import AddSongToPlaylistBtn from "../pages/playlist/components/AddSongToPlaylistBtn";

const PlaybackControls = () => {
  const { currentSong, isPlaying, togglePlay, playNext, playPrevious } =
    usePlayerStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [duration, setDuration] = useState(0);

  console.log(duration);

  useEffect(() => {
    audioRef.current = document.querySelector("audio");
    const audio = audioRef.current;
    if (!audio) return;

    const updateDuration = () => setDuration(audio.duration || 0);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("durationchange", updateDuration);

    return () => {
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("durationchange", updateDuration);
    };
  }, [currentSong]);

  return (
    <footer className="flex-shrink-0 p-3 bg-neutral-800/40 border border-neutral-800  mx-3 mb-2 rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center h-full max-w-[1800px] mx-auto mb-3 sm:mb-0">
        {/* Currently playing song */}
        <div className="flex items-center gap-4 w-fit sm:min-w-[180px] sm:w-[30%]">
          {currentSong && (
            <>
              <img
                src={currentSong.imageURL}
                alt={currentSong.title}
                className="w-14 h-14 object-cover rounded-md"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate hover:underline cursor-pointer">
                  {currentSong.title}
                </div>
                <div className="text-sm text-neutral-500 truncate cursor-pointer">
                  @{currentSong.artist}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Player Controls */}
        <div className="flex flex-col-reverse sm:flex-col items-center gap-2 flex-1 w-full max-w-full sm:max-w-[45%]">
          <div className="flex items-center gap-4 sm:gap-6 justify-evenly w-full sm:w-fit">
            <button className="text-neutral-400 control-btn cursor-pointer">
              <Shuffle className="size-5" />
            </button>

            {/* prev btn */}
            <button
              className="control-btn"
              onClick={playPrevious}
              disabled={!currentSong}
            >
              <SkipBack className="size-5 cursor-pointer mr-1" fill="#fafafa" />
            </button>

            {/* Play/Pause Button */}
            <button
              className="hover:text-white text-zinc-400"
              onClick={togglePlay}
              disabled={!currentSong}
            >
              <div className="text-neutral-900 size-7 flex items-center justify-center transition hover:bg-neutral-200 hover:scale-110 rounded-full bg-neutral-50 active:scale-100 active:bg-neutral-400 will-change-transform cursor-pointer">
                {isPlaying ? (
                  <Squircle className="w-3.5 h-3.5" fill="#171717" />
                ) : (
                  <Triangle
                    className="w-3.5 h-3.5 ml-[2px] rotate-90"
                    fill="#171717"
                  />
                )}
              </div>
            </button>

            {/* next btn */}
            <button
              className="control-btn"
              onClick={playNext}
              disabled={!currentSong}
            >
              <SkipForward className="size-5 cursor-pointer" fill="#fafafa" />
            </button>

            {/* add to playlist btn */}
            {currentSong?._id && (
              <AddSongToPlaylistBtn songId={currentSong?._id} />
            )}
          </div>

          {/* Progress Slider */}
          <ProgressSlider audio={audioRef.current} />
        </div>

        {/* Volume Control */}
        <div className="hidden sm:flex  items-center justify-end gap-4  w-[30%]">
          <VolumeControl audio={audioRef.current} />
        </div>
      </div>
    </footer>
  );
};

export default PlaybackControls;
