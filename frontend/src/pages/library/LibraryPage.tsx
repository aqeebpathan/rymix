import { toast } from "sonner";
import { Link } from "react-router-dom";
import { AlignStartVertical, ListMusic } from "lucide-react";

import ScrollArea from "../../components/ScrollArea";
import useAuthStore from "../../stores/useAuthStore";
import usePlaylistStore from "../../stores/usePlaylistStore";

const LibraryPage = () => {
  const { isAuthenticated } = useAuthStore();
  const { playlists, openCreateModal } = usePlaylistStore();

  const handleCreatePlaylist = () => {
    if (!isAuthenticated) {
      return toast.error("Please login to create a playlist.");
    }
    openCreateModal();
  };

  return (
    <div className="rounded-md overflow-hidden h-full bg-gradient-to-b from-neutral-700/70 to-neutral-950">
      <ScrollArea>
        <div className="p-4 !pr-1 sm:p-6 sm:!pr-3">
          <div className="flex justify-between items-center my-6 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-50 flex items-center gap-4">
              <AlignStartVertical className="size-10 sm:size-12" /> Your Library
            </h1>
          </div>

          <button
            onClick={handleCreatePlaylist}
            className="bg-neutral-50 text-neutral-900 text-sm font-bold px-4 py-1.5 rounded-full cursor-pointer tracking-tight hover:opacity-85 active:scale-95 transition-all my-4"
          >
            Create playlist
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 ">
            {playlists.map((playlist) => (
              <Link
                to={`/playlists/${playlist._id}`}
                key={playlist._id}
                className="mb-4 flex items-center gap-3 overflow-hidden rounded"
              >
                <div className="flex items-center justify-center bg-neutral-50/10 rounded size-12 md:size-24 shrink-0">
                  <ListMusic className="text-neutral-400 size-6 md:size-11" />
                </div>

                <div className="flex-grow overflow-hidden">
                  <h1 className="text-neutral-100 font-semibold truncate">
                    {playlist.name}
                  </h1>
                  <strong className="text-neutral-400 text-sm font-normal tracking-tight">
                    Playlist / {playlist.songs.length} Songs
                  </strong>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default LibraryPage;
