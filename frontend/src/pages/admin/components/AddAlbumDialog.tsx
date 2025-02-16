import { toast } from "sonner";
import { Upload } from "lucide-react";
import { useRef, useState } from "react";

import { AxiosInstance } from "../../../lib/axios";

const AddAlbum = ({ onClose }: { onClose: () => void }) => {
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newAlbum, setNewAlbum] = useState({
    title: "",
    artist: "",
    releaseYear: new Date().getFullYear(),
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      if (!imageFile) {
        return toast.error("Please uplaod an album image");
      }

      const formData = new FormData();

      formData.append("title", newAlbum.title);
      formData.append("artist", newAlbum.artist);
      formData.append("releaseYear", newAlbum.releaseYear.toString());
      formData.append("imageFile", imageFile);

      const res = await AxiosInstance.post("/admin/albums", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setNewAlbum({
        title: "",
        artist: "",
        releaseYear: new Date().getFullYear(),
      });

      setImageFile(null);
      onClose();

      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="text-neutral-950 tracking-tight">
      <h1 className="text-2xl font-medium text-center">Add new album</h1>
      <p className="text-center text-sm">Uplaod new album on the Rymix</p>
      <div className="mt-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageSelect}
          accept="image/*"
          className="hidden"
        />

        {/* image uplaod */}
        <div
          className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer mb-2"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="text-center">
            <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
              <Upload className="h-6 w-6 text-zinc-400" />
            </div>
            <div className="text-sm text-zinc-400 mb-2">
              {imageFile ? imageFile.name : "Upload album artwork"}
            </div>
            <button className="text-xs">Choose File</button>
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
                setNewAlbum({ ...newAlbum, title: e.target.value })
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
                setNewAlbum({ ...newAlbum, artist: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="duration" className="text-sm font-medium">
              Release year
            </label>
            <input
              type="text"
              name="duration"
              className="w-full border-2 px-2 py-1 border-neutral-400 focus:ring-neutral-900 rounded"
              onChange={(e) =>
                setNewAlbum({
                  ...newAlbum,
                  releaseYear: parseInt(e.target.value),
                })
              }
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-neutral-800 text-neutral-100 text-sm px-4 py-2 rounded mt-2 hover:opacity-85 cursor-pointer font-medium"
          >
            {submitting ? "Adding..." : "Add album"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAlbum;
