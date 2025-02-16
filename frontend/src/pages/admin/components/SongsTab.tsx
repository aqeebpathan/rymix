import useMusicStore from "../../../stores/useMusicStore";
import { formatReleaseDate } from "../../album/AlbumPage";

const SongsTab = () => {
  const { songs, deleteSong } = useMusicStore();

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 my-2 gap-4 text-sm px-4 mt-4">
        <h2>Title</h2>
        <h2>Artist</h2>
        <h2>Release on</h2>
        <h2 className="text-end">Action</h2>
      </div>
      <div className="my-2">
        {songs.map((song) => (
          <div
            key={song._id}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2 hover:bg-neutral-800/50 text-neutral-500 text-sm px-4 transition-colors items-center"
          >
            <div className="flex items-center gap-3">
              <img
                src={song.imageURL}
                alt={song.title}
                className="size-8 rounded"
              />
              <h2>{song.title}</h2>
            </div>
            <p>{song.artist}</p>
            <p>{formatReleaseDate(song.createdAt)}</p>
            <button
              className="justify-self-end text-red-500 bg-red-100 hover:bg-red-300 hover:text-red-600 px-2 py-1 rounded-md cursor-pointer tracking-tight transition-all"
              onClick={() => deleteSong(song._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongsTab;
