import { useState, useEffect } from "react";
import { Volume, Volume1, Volume2 } from "lucide-react";

interface VolumeControlProps {
  audio: HTMLAudioElement | null;
}

export default function VolumeControl({ audio }: VolumeControlProps) {
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isDisabled = !audio || !audio.src;

  useEffect(() => {
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume / 100;
    audio.muted = isMuted;
  }, [audio, volume, isMuted]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audio) {
      audio.muted = !isMuted;
    }
  };

  return (
    <div
      className="flex items-center justify-end gap-2 w-full mr-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        disabled={isDisabled}
        className="text-neutral-50 cursor-pointer"
      >
        {isMuted || volume === 0 ? (
          <Volume className="size-5" />
        ) : volume <= 50 ? (
          <Volume1 className="size-5" />
        ) : (
          <Volume2 className="size-5" />
        )}
      </button>
      {/* Volume Slider */}
      <div className="relative min-w-20 shrink-0">
        {/* Background track */}
        <div className="absolute top-1/2 w-full h-1 bg-neutral-600 rounded-lg transform -translate-y-1/2" />

        {/* Volume progress */}
        <div
          className="absolute top-1/2 h-1 bg-white rounded-lg transform -translate-y-1/2 transition-all duration-150 ease-in-out"
          style={{ width: `${isMuted ? 0 : volume}%` }}
        />

        {/* Range input (for smooth dragging) */}
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={isMuted ? 0 : volume}
          onMouseDown={() => setIsSeeking(true)}
          onMouseUp={() => setIsSeeking(false)}
          onTouchStart={() => setIsSeeking(true)}
          onTouchEnd={() => setIsSeeking(false)}
          onChange={handleVolumeChange}
          disabled={isDisabled}
          className="w-full h-4 opacity-0 appearance-none cursor-grab active:cursor-grabbing absolute -mt-2"
        />

        {/* Seek thumb (only visible on hover/dragging) */}
        <div
          className={`absolute top-1/2 w-3 h-3 bg-white rounded-full transform -translate-y-1/2 transition-opacity duration-200 ${
            isHovered || isSeeking ? "opacity-100 scale-110" : "opacity-0"
          }`}
          style={{ left: `calc(${isMuted ? 0 : volume}% - 6px)` }}
        />
      </div>
      <strong className="text-neutral-500 w-7">
        {volume}
        <span className={isMuted ? "opacity-100" : "opacity-0"}>m</span>
      </strong>
    </div>
  );
}
