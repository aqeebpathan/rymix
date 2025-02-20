import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Clock, ListMinus, Square, Triangle } from "lucide-react";

import NotFoundPage from "../404/NotFoundPage";
import ScrollArea from "../../components/ScrollArea";
import useMusicStore from "../../stores/useMusicStore";
import usePlayerStore from "../../stores/usePlayerStore";
import DynamicGradient from "./components/DynamicGradient";
import AlbumPageSkeleton from "./components/AlbumPageSkeleton";
import SongPlayingAnimation from "./components/SongPlayingAnimation";

const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
  const { currentSong, isPlaying, playQueue, togglePlay } = usePlayerStore();

  useEffect(() => {
    fetchAlbumById(albumId!);
  }, [fetchAlbumById, albumId]);

  const handlePlayAlbum = () => {
    if (!currentAlbum) return;

    const isCurrentAlbumPlaying = currentAlbum?.songs.some(
      (song) => song._id === currentSong?._id
    );

    if (isCurrentAlbumPlaying) togglePlay();
    else playQueue(currentAlbum?.songs, 0);
  };

  const handlePlaySong = (index: number) => {
    if (!currentAlbum) return;

    playQueue(currentAlbum?.songs, index);
  };

  if (isLoading) {
    return <AlbumPageSkeleton />;
  }

  if (!isLoading && !currentAlbum) {
    return <NotFoundPage />;
  }

  return (
    <div className="rounded-md overflow-hidden h-full min-h-full relative">
      <ScrollArea>
        <DynamicGradient />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row p-6 gap-6  pb-6 sm:pb-8">
            <img
              src={currentAlbum?.imageURL}
              alt={currentAlbum?.title}
              className="size-60 shadow-xl rounded"
            />
            <div className="flex flex-col justify-end">
              <p className="text-sm font-medium">Album</p>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold my-2">
                {currentAlbum?.title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-zinc-100">
                <span className="font-medium text-white">
                  {currentAlbum?.artist}
                </span>
                <span>/ {currentAlbum?.songs.length} songs</span>
                <span>/ {currentAlbum?.releaseYear}</span>
              </div>
            </div>
          </div>

          {/* play button */}
          <div className="px-6 pb-4 flex items-center gap-6">
            <button
              onClick={handlePlayAlbum}
              className="size-10 md:size-14 rounded-lg bg-neutral-200 text-neutral-900 hover:scale-105 transition-all flex justify-center items-center cursor-pointer"
            >
              {isPlaying &&
              currentAlbum?.songs.some(
                (song) => song._id === currentSong?._id
              ) ? (
                <Square fill="#171717" className="size-5 sm:size-7" />
              ) : (
                <Triangle
                  fill="#171717"
                  className="size-5 sm:size-7 rotate-90"
                />
              )}
            </button>
          </div>

          {/* table section*/}
          <div className="">
            <div className="grid grid-cols-[16px_4fr_1fr] sm:grid-cols-[16px_4fr_2fr_1fr] gap-4 px-6  py-2 text-sm text-neutral-400 border-b border-white/5">
              <div className="flex justify-center items-center ">
                <ListMinus size={16} />
              </div>
              <div>Title</div>
              <div className="hidden sm:inline">Released on</div>
              <div>
                <Clock className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* songs list */}
          <div className="px-1">
            <div className="space-y-2 py-4">
              {currentAlbum?.songs.map((song, index) => {
                const isCurrentSong = currentSong?._id === song._id;
                return (
                  <div
                    key={song._id}
                    onClick={() => handlePlaySong(index)}
                    className={`grid grid-cols-[16px_4fr_1fr] sm:grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-neutral-400 hover:bg-neutral-800/90 rounded-md group cursor-pointer`}
                  >
                    <div className="flex items-center justify-center">
                      {!isCurrentSong && (
                        <span className="group-hover:hidden">{index + 1}</span>
                      )}

                      {isCurrentSong && !isPlaying && (
                        <Triangle
                          fill="#e5e5e5"
                          className="size-4  text-neutral-200 rotate-90"
                        />
                      )}

                      {isPlaying && isCurrentSong && <SongPlayingAnimation />}

                      {!currentSong && (
                        <Triangle
                          fill="#e5e5e5"
                          className="size-4 hidden group-hover:block text-neutral-200 rotate-90"
                        />
                      )}

                      {currentSong && currentSong._id !== song._id && (
                        <Triangle
                          fill="#e5e5e5"
                          className="size-4 hidden group-hover:block text-neutral-200 rotate-90"
                        />
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <img
                        src={song.imageURL}
                        alt={song.title}
                        className="size-10 rounded"
                      />

                      <div>
                        <div className={`font-medium text-white`}>
                          {song.title}
                        </div>
                        <div>{song.artist}</div>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center">
                      {formatReleaseDate(song.createdAt)}
                    </div>
                    <div className="flex items-center">
                      {formatDuration(song.duration)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function formatReleaseDate(timestamp: string) {
  const date = new Date(timestamp);
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return `${month} ${day}, ${year}`;
}

export default AlbumPage;
