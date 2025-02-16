import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import useMusicStore from "../../../stores/useMusicStore";

const AlbumsSection = () => {
  const { albums } = useMusicStore();

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">Albums</h2>
        <button className="text-sm text-neutral-400 hover:text-neutral-50 cursor-pointer">
          Show all
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {albums.map((album) => (
          <div
            key={album._id}
            className="flex flex-col gap-4 rounded-lg overflow-hidden bg-neutral-500/10 hover:bg-neutral-500/60 transition-colors group"
          >
            <Link to={`/albums/${album._id}`}>
              <div className="aspect-square overflow-hidden">
                <img
                  src={album.imageURL}
                  alt={album.title}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex justify-between items-center gap-2 p-4">
                <div>
                  <h2 className=" sm:text-xl font-medium text-neutral-50 leading-tight ">
                    {album.title}
                  </h2>
                  <strong className="text-neutral-400 font-medium text-sm tracking-tighter">
                    {String(album.songs.length).padStart(2, "0")} Songs
                  </strong>
                </div>
                <ArrowUpRight className="sm:hidden group-hover:inline transition-all text-neutral-400 shrink-0" />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AlbumsSection;
