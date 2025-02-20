import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Clock, ListMinus, ListMusic, Square, Triangle } from "lucide-react";

import ActionMenu from "./components/ActionMenu";
import { formatDuration } from "../album/AlbumPage";
import ScrollArea from "../../components/ScrollArea";
import usePlayerStore from "../../stores/usePlayerStore";
import usePlaylistStore from "../../stores/usePlaylistStore";
import SongPlayingAnimation from "../album/components/SongPlayingAnimation";

const PlaylistPage = () => {
  const { playlistId } = useParams();
  const [totalDuration, setTotalDuration] = useState(0);
  const { currentSong, togglePlay, playQueue, isPlaying } = usePlayerStore();
  const { currentPlaylist, fetchPlaylistSongs } = usePlaylistStore();

  useEffect(() => {
    fetchPlaylistSongs(playlistId!);
  }, [fetchPlaylistSongs, playlistId]);

  const handlePlayPlaylist = () => {
    if (!currentPlaylist) return;

    const isCurrentPlaylistPlaying = currentPlaylist.songs.some(
      (song) => song._id === currentSong?._id
    );

    if (isCurrentPlaylistPlaying) togglePlay();
    else playQueue(currentPlaylist?.songs, 0);
  };

  const handlePlaySong = (index: number) => {
    if (!currentPlaylist) return;

    playQueue(currentPlaylist.songs, index);
  };

  useEffect(() => {
    if (currentPlaylist) {
      const total = currentPlaylist.songs.reduce(
        (acc, song) => acc + song.duration,
        0
      );
      setTotalDuration(total);
    }
  }, [currentPlaylist]);

  return (
    <div className="rounded-md overflow-hidden h-full bg-gradient-to-b from-neutral-700/70 to-neutral-950">
      <ScrollArea>
        {/* Content */}
        <div className="relative z-10 overflow-hidden">
          <div className="flex flex-col md:flex-row p-6 gap-6 pb-6 sm:pb-8">
            <div className="size-60 bg-neutral-50/10 backdrop-blur-3xl shadow-xl rounded flex justify-center items-center shrink-0">
              <ListMusic className="size-40" />
            </div>

            <div className="flex flex-col justify-end">
              <p className="text-sm font-medium">Playlist</p>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold my-1 md:my-2 text-wrap">
                {currentPlaylist?.name}
              </h1>
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                {currentPlaylist?.songs?.length ? (
                  <span>
                    {currentPlaylist.songs.length} songs •{" "}
                    {formatTime(totalDuration)}
                  </span>
                ) : (
                  <p>Start building your playlist!</p>
                )}
              </div>
            </div>
          </div>

          {/* play button */}
          <div className="px-6 pb-4 flex items-center gap-5 md:gap-6">
            <button
              onClick={handlePlayPlaylist}
              className="size-10 md:size-14 rounded-lg bg-neutral-200 text-neutral-900 hover:scale-105 transition-all flex justify-center items-center cursor-pointer"
            >
              {isPlaying &&
              currentPlaylist?.songs.some(
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

            <ActionMenu />
          </div>

          {/* table section*/}
          <div className="">
            <div className="grid grid-cols-[16px_4fr_1fr] gap-4 px-6  py-2 text-sm text-neutral-400 border-b border-white/5">
              <div className="flex justify-center items-center ">
                <ListMinus size={16} />
              </div>
              <div>Title</div>
              <div>
                <Clock className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* songs list */}
          <div className="px-1">
            <div className="space-y-2 py-4">
              {currentPlaylist?.songs.map((song, index) => {
                const isCurrentSong = currentSong?._id === song._id;
                return (
                  <div
                    key={song._id}
                    onClick={() => handlePlaySong(index)}
                    className={`grid grid-cols-[16px_4fr_1fr] gap-4 px-4 py-2 text-sm text-neutral-400 hover:bg-neutral-800/90 rounded-md group cursor-pointer`}
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

function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const remainingMinutes = Math.floor((seconds % 3600) / 60);

  let timeString = "";

  if (hours > 0) {
    timeString += hours + "h";
  }

  if (remainingMinutes > 0 || hours > 0) {
    timeString += " " + remainingMinutes + "m";
  }

  return timeString.trim();
}

export default PlaylistPage;
