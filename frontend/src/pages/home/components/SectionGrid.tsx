import { Song } from "../../../types";
import PlayButton from "./PlayButton";

type SectionGridProps = {
  title: string;
  songs: Song[];
  isLoading: boolean;
};

const SectionGrid = ({ title, songs, isLoading }: SectionGridProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
        <button className="text-sm text-neutral-400 hover:text-neutral-50 cursor-pointer">
          Show all
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : songs.map((song) => (
              <div
                key={song._id}
                className="bg-neutral-500/10 p-4 rounded-md hover:bg-neutral-500/60 transition-colors group cursor-pointer"
              >
                <div className="relative mb-4">
                  <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                    <img
                      src={song.imageURL}
                      alt={song.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* play btn */}
                    <PlayButton song={song} />
                  </div>
                </div>
                <h3 className="font-medium mb-1 truncate">{song.title}</h3>
                <p className="text-sm text-neutral-400 truncate">
                  @{song.artist}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="bg-neutral-500/10 p-4 rounded-md cursor-pointer animate-pulse">
    <div className="relative mb-4">
      <div className="aspect-square rounded-md shadow-lg bg-neutral-700/50" />
    </div>
    <div className="h-4 bg-neutral-700/50 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-neutral-700/50 rounded w-1/2"></div>
  </div>
);

export default SectionGrid;
