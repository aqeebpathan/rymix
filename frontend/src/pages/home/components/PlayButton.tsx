import { Squircle, Triangle } from "lucide-react";

import { Song } from "../../../types";
import usePlayerStore from "../../../stores/usePlayerStore";

const PlayButton = ({ song }: { song: Song }) => {
  const { currentSong, isPlaying, setCurrentSong, togglePlay } =
    usePlayerStore();
  const isCurrentSong = currentSong?._id === song._id;

  const handlePlay = () => {
    if (isCurrentSong) togglePlay();
    else setCurrentSong(song);
  };

  return (
    <button
      onClick={handlePlay}
      className={`absolute p-2 rounded-md bottom-5 sm:bottom-3 right-3 bg-neutral-200 text-neutral-900 hover:bg-neutral-100 hover:scale-105 transition-all opacity-100 translate-y-2 sm:opacity-0 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 cursor-pointer  ${
        isCurrentSong
          ? "opacity-100"
          : "sm:opacity-0 sm:group-hover:opacity-100"
      }`}
    >
      {isCurrentSong && isPlaying ? (
        <Squircle className="size-4" fill="#171717" />
      ) : (
        <Triangle className="size-4 rotate-90" fill="#171717" />
      )}
    </button>
  );
};

export default PlayButton;
