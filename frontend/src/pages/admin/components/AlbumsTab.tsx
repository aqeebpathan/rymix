import { Link } from "react-router-dom";

import useMusicStore from "../../../stores/useMusicStore";

const AlbumsTab = () => {
  const { albums, deleteAlbum } = useMusicStore();

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 my-2 gap-4 text-sm px-4 mt-4">
        <h2>Title</h2>
        <h2>Artist</h2>
        <h2>Release</h2>
        <h2 className="text-end">Action</h2>
      </div>
      <div className="my-2">
        {albums.map((album) => (
          <div
            key={album._id}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2 hover:bg-neutral-800/50 text-neutral-500 hover:text-neutral-200 text-sm px-4 transition-colors items-center"
          >
            <div className="flex items-center gap-3">
              <img
                src={album.imageURL}
                alt={album.title}
                className="size-8 rounded"
              />
              <Link
                to={`/albums/${album._id}`}
                className="hover:text-neutral-50"
              >
                <h2>{album.title}</h2>
              </Link>
            </div>
            <p>{album.artist}</p>
            <p>{album.releaseYear}</p>
            <button
              className="justify-self-end text-red-500 bg-red-100 hover:bg-red-300 hover:text-red-600 px-2 py-1 rounded-md cursor-pointer tracking-tight transition-all"
              onClick={() => deleteAlbum(album._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumsTab;
