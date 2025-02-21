import { toast } from "sonner";
import { X } from "lucide-react";
import { useState } from "react";

import usePlaylistStore from "../../../stores/usePlaylistStore";

const PlaylistModal = () => {
  const { isCreateModalOpen, closeCreateModal, createPlaylist } =
    usePlaylistStore();
  const [name, setName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isCreateModalOpen) return null;

  const handleCreatePlaylist = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.length < 3) {
      return toast.error("Playlist name must be longer than 3 characters");
    }

    setLoading(true);
    await createPlaylist(name, isPublic);
    setLoading(false);
    setName("");
    setIsPublic(false);
    closeCreateModal();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setName(capitalizedValue);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-50 m-0 px-2">
      <div className="bg-neutral-900 border border-neutral-700 text-neutral-100 p-6 rounded-xl shadow-lg w-[400px] relative transition-all">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium">Create Playlist</h2>
          <button onClick={closeCreateModal}>
            <X
              size={22}
              className="cursor-pointer -mt-1 text-neutral-400 hover:text-neutral-200 transition-colors"
            />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleCreatePlaylist} className="mt-4 space-y-3">
          <input
            type="text"
            placeholder="Playlist name"
            value={name}
            onChange={handleNameChange}
            disabled={loading}
            className={`w-full text-white text-3xl outline-none border-neutral-500 border-b-2 pb-2 placeholder:text-neutral-500 font-bold ${
              loading ? "caret-transparent" : ""
            }`}
          />

          <label className="flex items-center text-white text-sm cursor-pointer mt-1">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="mr-2 cursor-pointer appearance-none border-2 border-neutral-500 rounded-sm w-4 h-4 checked:bg-neutral-50 checked:border-neutral-50 transition-colors"
            />
            Make this playlist public{" "}
          </label>

          {/* Buttons */}
          <div className="flex justify-center gap-3 mt-5">
            <button
              type="submit"
              className="bg-neutral-100 text-neutral-950 text-sm font-semibold py-2 px-4 rounded hover:opacity-85 cursor-pointer tracking-tight w-full"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaylistModal;
