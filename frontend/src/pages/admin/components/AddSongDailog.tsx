import { toast } from "sonner";
import { Upload } from "lucide-react";
import { useRef, useState } from "react";

import Select from "./Select";
import { AxiosInstance } from "../../../lib/axios";
import useMusicStore from "../../../stores/useMusicStore";

const AddSong = ({ onClose }: { onClose: () => void }) => {
  const { albums } = useMusicStore();
  const [submitting, setSubmitting] = useState(false);

  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    duration: "0",
  });
  const [files, setFiles] = useState<{
    audio: File | null;
    image: File | null;
  }>({
    audio: null,
    image: null,
  });

  const audioInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      if (!files.audio || !files.image) {
        return toast.error("Please uplaod both audio and image files");
      }

      const formData = new FormData();

      formData.append("title", newSong.title);
      formData.append("artist", newSong.artist);
      formData.append("duration", newSong.duration);

      // todo: check
      if (selectedAlbum) {
        formData.append("albumId", selectedAlbum);
      }

      formData.append("audioFile", files.audio);
      formData.append("imageFile", files.image);

      const res = await AxiosInstance.post("/admin/songs", formData, {
        headers: {
          "Content-Type": "multipart/formdata",
        },
      });

      setNewSong({
        title: "",
        artist: "",
        duration: "",
      });

      setFiles({
        audio: null,
        image: null,
      });

      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setSubmitting(false);
      onClose();
    }
  };

  return (
    <div className="text-neutral-950 tracking-tight">
      <h1 className="text-2xl font-medium text-center">Add new song</h1>
      <p className="text-center text-sm">Uplaod new song on the Rymix</p>
      <div className="mt-2">
        <input
          hidden
          type="file"
          accept="audio/*"
          ref={audioInputRef}
          onChange={(e) =>
            setFiles((prev) => ({ ...prev, audio: e.target.files![0] }))
          }
        />

        <input
          hidden
          type="file"
          accept="image/*"
          ref={imageInputRef}
          onChange={(e) =>
            setFiles((prev) => ({ ...prev, image: e.target.files![0] }))
          }
        />

        {/* image uplaod */}
        <div
          className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer mt-3"
          onClick={() => imageInputRef.current?.click()}
        >
          <div className="text-center">
            {files.image ? (
              <div className="space-y-2 p-3">
                <div className="text-sm text-emerald-500">
                  Image selected: <span>{files.image.name.slice(0, 20)}</span>
                </div>
              </div>
            ) : (
              <>
                <div className="p-3 bg-neutral-700 rounded-full inline-block mb-2">
                  <Upload className="h-6 w-6 text-neutral-400" />
                </div>
                <div className="text-sm">Upload artwork</div>
                <button className="text-xs">Choose File</button>
              </>
            )}
          </div>
        </div>

        {/* audio uplaod */}
        <div className="mt-4 mb-2 flex gap-3">
          <label className="text-sm font-medium">Audio File</label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => audioInputRef.current?.click()}
              className="w-full text-sm border border-dashed rounded px-1 cursor-pointer text-neutral-600"
            >
              {files.audio
                ? files.audio.name.slice(0, 20)
                : "Choose Audio File"}
            </button>
          </div>
        </div>

        {/* other fields */}
        <div className="flex flex-col gap-2">
          <div>
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="w-full border-2 px-2 py-1 border-neutral-400 focus:ring-neutral-900 rounded"
              onChange={(e) =>
                setNewSong({ ...newSong, title: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="artist" className="text-sm font-medium">
              Artist
            </label>
            <input
              type="text"
              name="artist"
              className="w-full border-2 px-2 py-1 border-neutral-400 focus:ring-neutral-900 rounded"
              onChange={(e) =>
                setNewSong({ ...newSong, artist: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="duration" className="text-sm font-medium">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              className="w-full border-2 px-2 py-1 border-neutral-400 focus:ring-neutral-900 rounded"
              onChange={(e) =>
                setNewSong({ ...newSong, duration: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm font-medium">Album?</label>
            <Select
              options={albums}
              value={selectedAlbum}
              onChange={setSelectedAlbum}
              placeholder="Select Album"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-neutral-800 text-neutral-100 text-sm px-4 py-2 rounded mt-2 hover:opacity-85 cursor-pointer font-medium"
          >
            {submitting ? "Adding..." : "Add song"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSong;
