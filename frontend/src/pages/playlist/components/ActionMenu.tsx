import { toast } from "sonner";
import { X, Ellipsis } from "lucide-react";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import usePlaylistStore from "../../../stores/usePlaylistStore";

const ActionBox = ({ onClose }: { onClose: () => void }) => {
  const { currentPlaylist, deletePlaylist } = usePlaylistStore();

  const navigate = useNavigate();

  const handleDelete = () => {
    if (!currentPlaylist) return;
    deletePlaylist(currentPlaylist?._id);
    navigate("/");
  };

  const handleAccess = () => {
    return toast.message(
      "This feature to toggle playlist visibility (public/private) is coming soon!"
    );
  };

  return (
    <div className="absolute left-0 bg-neutral-200  text-neutral-950 text-sm tracking-tight font-medium p-1 rounded-lg transition-all">
      <div>
        {["Public", "Delete"].map((action) => (
          <button
            key={action}
            className={`cursor-pointer px-3 py-1 transition-colors rounded w-full ${
              action === "Delete"
                ? "hover:bg-red-500 hover:text-neutral-50"
                : "hover:bg-blue-500 hover:text-neutral-50"
            }`}
            onClick={action === "Delete" ? handleDelete : handleAccess}
          >
            {action}
          </button>
        ))}
      </div>
      <button className="absolute bottom-5 left-22" onClick={onClose}>
        <X className="text-neutral-600 hover:text-neutral-50 transition-colors cursor-pointer" />
      </button>
    </div>
  );
};

const ActionMenu = () => {
  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback(() => setOpen((prev) => !prev), []);

  return (
    <div className="relative flex justify-center items-center">
      {open ? (
        <ActionBox onClose={toggleOpen} />
      ) : (
        <button onClick={toggleOpen}>
          <Ellipsis className="size-8 md:size-10 text-neutral-400 hover:text-neutral-50 transition-colors cursor-pointer" />
        </button>
      )}
    </div>
  );
};

export default ActionMenu;
