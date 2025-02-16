import { useState, useEffect } from "react";

interface ProgressSliderProps {
  audio: HTMLAudioElement | null;
}

export default function ProgressSlider({ audio }: ProgressSliderProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isDisabled = !audio || !audio.src || duration === 0;

  useEffect(() => {
    if (!audio) return;

    const updateTime = () => {
      if (!isSeeking) setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => setDuration(audio.duration || 100);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("durationchange", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("durationchange", updateDuration);
    };
  }, [audio, isSeeking]);

  const handleSeekStart = () => setIsSeeking(true);
  const handleSeekEnd = () => setIsSeeking(false);
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audio) return;
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    setCurrentTime(newTime);
    audio.currentTime = newTime;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      className="flex items-center gap-2 w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="text-xs text-neutral-300 w-10 font-mono font-medium -mr-[7px]">
        {formatTime(currentTime)}
      </span>

      <div className="relative w-full">
        {/* Background track */}
        <div className="absolute top-1/2 w-full h-1 bg-neutral-600 rounded-lg transform -translate-y-1/2" />

        {/* Played progress */}
        <div
          className="absolute top-1/2 h-1 bg-white rounded-lg transform -translate-y-1/2 transition-all duration-150 ease-in-out"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />

        {/* Range input (for grabbing behavior) */}
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={(currentTime / duration) * 100 || 0}
          onMouseDown={handleSeekStart}
          onMouseUp={handleSeekEnd}
          onTouchStart={handleSeekStart}
          onTouchEnd={handleSeekEnd}
          onChange={handleSeek}
          disabled={isDisabled}
          className="w-full h-4 opacity-0 appearance-none cursor-grab absolute -mt-2.5"
        />

        {/* Seek thumb (visible when hovering or dragging) */}
        <div
          className={`absolute top-1/2 w-3 h-3 bg-white rounded-full transform -translate-y-1/2 transition-opacity duration-200 ${
            isHovered || isSeeking ? "opacity-100 scale-110" : "opacity-0"
          }`}
          style={{ left: `calc(${(currentTime / duration) * 100}% - 6px)` }}
        />
      </div>

      <span className="text-xs text-neutral-300 w-10 font-mono font-medium ">
        {formatTime(duration)}
      </span>
    </div>
  );
}
