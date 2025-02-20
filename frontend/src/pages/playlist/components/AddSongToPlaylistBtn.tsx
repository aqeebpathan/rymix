import { useState } from "react";
import { FolderPlus, PlusCircle } from "lucide-react";

import usePlaylistStore from "../../../stores/usePlaylistStore";

const AddSongToPlaylistBtn = ({ songId }: { songId: string }) => {
  const [showPlaylist, setShowPlaylist] = useState(false);
  const { playlists, addSongToPlaylist } = usePlaylistStore();

  const handleAddSong = (playlistId: string) => {
    addSongToPlaylist(playlistId, songId);
    setShowPlaylist((prevState) => !prevState);
  };

  return (
    <div className="relative flex items-center justify-center">
      {showPlaylist && (
        <div className="absolute right-0 md:right-auto bottom-[160%] w-48 bg-neutral-300 border border-neutral-400 z-50 text-neutral-950 px-2 py-2 rounded shadow-2xl drop-shadow-2xl">
          <h3 className="font-extrabold text-lg mb-1 pl-1">Add to playlist</h3>
          {playlists.map((playlist) => (
            <div
              key={playlist._id}
              className="cursor-pointer text-sm font-medium flex items-center gap-2 hover:bg-neutral-50 p-1 rounded"
              onClick={() => handleAddSong(playlist._id)}
            >
              <FolderPlus className="size-5 shrink-0" />{" "}
              <span className="truncate font-semibold tracking-tight">
                {playlist.name}
              </span>
            </div>
          ))}
        </div>
      )}
      <button
        className="control-btn"
        onClick={() => setShowPlaylist((prevState) => !prevState)}
      >
        <PlusCircle
          className={`size-5 ml-1 cursor-pointer hover:scale-110 transition-transform ${
            showPlaylist ? "text-neutral-50 scale-110" : "text-neutral-400"
          }`}
        />
      </button>
    </div>
  );
};

export default AddSongToPlaylistBtn;
