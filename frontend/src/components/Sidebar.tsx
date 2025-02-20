import { toast } from "sonner";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AlignStartVertical, ListMusic, Plus } from "lucide-react";

import useAuthStore from "../stores/useAuthStore";
import useMusicStore from "../stores/useMusicStore";
import usePlaylistStore from "../stores/usePlaylistStore";
import PlaylistModal from "../pages/playlist/components/PlaylistModal";

const Sidebar = () => {
  const { isAuthenticated } = useAuthStore();
  const { fetchAlbums } = useMusicStore();
  const { fetchPlaylists, playlists, openCreateModal } = usePlaylistStore();

  useEffect(() => {
    fetchAlbums();
    fetchPlaylists();
  }, [fetchAlbums, fetchPlaylists]);

  const handleCreatePlaylist = () => {
    if (!isAuthenticated) {
      return toast.error("Please login to create a playlist.");
    }
    openCreateModal();
  };

  return (
    <>
      <aside className="w-[270px] flex-shrink-0 h-full hidden md:flex flex-col bg-neutral-800/40 rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-center text-neutral-300 p-5">
          <div className="flex items-center gap-2 hover:text-neutral-50 transition-all ease-in-out delay-75 cursor-pointer">
            <AlignStartVertical size={24} />
            <h2 className="font-bold tracking-tight">Your Library</h2>
          </div>

          <button
            onClick={handleCreatePlaylist}
            className="hover:text-neutral-100 hover:bg-neutral-600/30 rounded-full p-1 cursor-pointer transition-all delay-75 active:scale-95"
          >
            <Plus size={22} />
          </button>
        </div>

        {/* Scrollable Playlist Section */}
        <div className="overflow-y-auto flex-1 px-2 py-2 scrollbar">
          {playlists.length > 0 ? (
            <div>
              {playlists.map((playlist) => (
                <Link
                  to={`/playlists/${playlist._id}`}
                  key={playlist._id}
                  className="mb-4 flex items-center gap-3 mx-3 overflow-hidden rounded"
                >
                  <div className="flex items-center justify-center bg-neutral-50/10 rounded size-12 shrink-0">
                    <ListMusic className="text-neutral-400" />
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
          ) : (
            <div className="bg-neutral-800/70 rounded-lg m-2 p-5">
              <h2 className="font-bold tracking-tight">
                Start your first playlist
              </h2>
              <p className="text-sm tracking-tight mt-1">
                It's simple, and easy to create.
              </p>
              <button
                onClick={handleCreatePlaylist}
                className="bg-neutral-50 text-neutral-900 text-sm font-bold px-4 py-1.5 rounded-full mt-5 cursor-pointer tracking-tight hover:opacity-85 active:scale-95 transition-all"
              >
                Create playlist
              </button>
            </div>
          )}
        </div>

        {/* Footer Disclaimer & Tech Stack */}
        <div className="text-xs p-3 text-neutral-500 font-medium space-y-3 leading-tight">
          <p>
            © All songs belong to their respective owners.{" "}
            <Link
              to="/credits"
              target="_blank"
              className="hover:text-neutral-50 transition-colors"
            >
              Music credits
            </Link>
          </p>
          <p>
            Built with <span>React, Zustand, Node.js, Express, Cloudinary</span>
            .
          </p>
        </div>
      </aside>

      {/* Playlist Modal */}
      <PlaylistModal />
    </>
  );
};

export default Sidebar;
