import { toast } from "sonner";
import { useEffect } from "react";

import useMusicStore from "../stores/useMusicStore";
import { AlignStartVertical, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { fetchAlbums } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  const handleCreatePlaylist = () => {
    toast.message("Create Playlist feature is not yet implemented.");
  };

  return (
    <aside className="w-[270px] flex-shrink-0 h-full justify-between hidden md:flex flex-col bg-neutral-800/40 rounded-lg">
      <div>
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

        <div className="bg-neutral-800/70 rounded-lg m-2 p-5">
          <h2 className="font-bold tracking-tight">
            Start your first playlist
          </h2>
          <p className="text-sm tracking-tight mt-1">It's simple, and easy.</p>

          <button
            onClick={handleCreatePlaylist}
            className="bg-neutral-50 text-neutral-900 text-sm font-bold px-4 py-1.5 rounded-full mt-5 cursor-pointer tracking-tight hover:opacity-85 active:scale-95 transition-all"
          >
            Create playlist
          </button>
        </div>
      </div>

      {/* Footer Disclaimer & Tech Stack */}
      <div className="text-xs p-3 text-neutral-500 font-medium space-y-3 leading-tight pt-8">
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
          Built with <span>React, Zustand, Node.js, Express, Cloudinary</span>.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
