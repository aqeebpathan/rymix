import PlayButton from "./PlayButton";
import { Song } from "../../../types";

type FeaturedSectionProps = {
  songs: Song[];
  isLoading: boolean;
};

const FeaturedSection = ({ songs, isLoading }: FeaturedSectionProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {isLoading
        ? Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        : songs.map((song) => (
            <div
              key={song._id}
              className="flex items-center bg-neutral-500/10 backdrop-blur-lg rounded-md overflow-hidden hover:bg-neutral-500/60 transition-colors group cursor-pointer relative"
            >
              <img
                src={song.imageURL}
                alt={song.title}
                className="w-16 sm:w-20 h-full sm:h-20 object-cover shrink-0"
              />
              <div className="flex-1 p-3">
                <p className="font-medium truncate text-neutral-50">
                  {song.title}
                </p>
                <p className="text-sm text-neutral-400 truncate w-3/4">
                  @{song.artist}
                </p>
              </div>

              {/* play button */}
              <PlayButton song={song} />
            </div>
          ))}
    </div>
  );
};

const SkeletonCard = () => (
  <div className="flex items-center bg-neutral-500/10 backdrop-blur-lg rounded-md overflow-hidden cursor-pointer relative animate-pulse">
    <div className="w-16 sm:w-20 h-full sm:h-20 bg-neutral-700/50" />
    <div className="flex-1 p-3">
      <div className="h-4 bg-neutral-700/50 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-neutral-700/50 rounded w-1/2"></div>
    </div>
  </div>
);

export default FeaturedSection;
