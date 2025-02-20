import { toast } from "sonner";
import { useState } from "react";
import { FolderPlus, PlusCircle } from "lucide-react";

import useAuthStore from "../../../stores/useAuthStore";
import usePlaylistStore from "../../../stores/usePlaylistStore";

const AddSongToPlaylistBtn = ({ songId }: { songId: string }) => {
  const { isAuthenticated } = useAuthStore();
  const { playlists, addSongToPlaylist } = usePlaylistStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to add songs to a playlist.");
      return;
    }
    setIsDropdownOpen((prev) => !prev);
  };

  const handleAddSong = (playlistId: string) => {
    addSongToPlaylist(playlistId, songId);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative flex items-center justify-center">
      {isDropdownOpen && (
        <div className="absolute right-0 md:right-auto bottom-[160%] w-48 bg-neutral-300 border border-neutral-400 z-50 text-neutral-950 px-2 py-2 rounded shadow-2xl drop-shadow-2xl">
          <h3 className="font-extrabold text-lg mb-1 pl-1">Add to Playlist</h3>
          {playlists.length > 0 ? (
            playlists.map((playlist) => (
              <div
                key={playlist._id}
                className="cursor-pointer text-sm font-medium flex items-center gap-2 hover:bg-neutral-50 p-1 rounded"
                onClick={() => handleAddSong(playlist._id)}
              >
                <FolderPlus className="size-5 shrink-0" />
                <span className="truncate font-semibold tracking-tight">
                  {playlist.name}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-neutral-700 px-1 leading-tight tracking-tight">
              No playlists available. Create one to get started.
            </p>
          )}
        </div>
      )}

      <button className="control-btn" onClick={toggleDropdown}>
        <PlusCircle
          className={`size-5 ml-1 cursor-pointer hover:scale-110 transition-transform ${
            isDropdownOpen ? "text-neutral-50 scale-110" : "text-neutral-400"
          }`}
        />
      </button>
    </div>
  );
};

export default AddSongToPlaylistBtn;
