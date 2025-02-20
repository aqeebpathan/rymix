import { Link } from "react-router-dom";
import TRACKS from "./tracks";

const CreditsPage = () => {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold sm:text-center py-6">
          Music Credits
        </h1>

        <p className="sm:text-center text-neutral-400 mb-8">
          This platform is a non-commercial, learning project. All rights to the
          music remain with their respective creators. Please support the
          original artists. Tracks are sourced from platform NoCopyrightSounds
          (NCS).
        </p>

        {/* Table Headers */}
        <div className="grid grid-cols-3 my-2 gap-4 text-sm sm:mx-4 mt-4 text-neutral-100 border-b border-neutral-700 pb-2">
          <h2>Title</h2>
          <h2>Artist</h2>
          <h2 className="text-end">Link</h2>
        </div>

        {/* Track List */}
        <div className="my-2">
          {TRACKS.map((track, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-4 py-2 hover:bg-neutral-800/50 text-neutral-500 hover:text-neutral-200 text-sm sm:px-4 transition-colors "
            >
              <div>
                <Link
                  to={track.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-50"
                >
                  {track.title}
                </Link>
              </div>
              <p>{track.artist}</p>
              <Link
                to={track.link}
                className="justify-self-end hover:text-blue-400"
              >
                View
              </Link>
            </div>
          ))}
        </div>

        <footer className="text-[14px] text-neutral-500 mt-6 mb-4 leading-tight md:px-4">
          <p>
            The audio tracks on this platform are embedded directly from
            NoCopyrightSounds (NCS), ensuring proper attribution to the original
            creators. For more information on the artists and their work, please
            visit the respective NCS track pages.
          </p>
          <p className="mt-3">
            If you notice any inaccuracies in the artist names or links, please
            let us know, and we will update the information accordingly.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default CreditsPage;
