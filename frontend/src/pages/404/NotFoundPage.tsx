import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-neutral-900 text-white text-center p-6 rounded-lg">
      <h1 className="text-6xl font-extrabold mt-4 text-neutral-300">404</h1>
      <p className="text-2xl mt-4 font-semibold text-neutral-300">
        Uh-oh! The beat dropped... and so did this page.
      </p>
      <p className="text-neutral-500 mt-2">
        Looks like this track is missing from our playlist.
      </p>

      <Link
        to="/"
        className="mt-6 px-5 py-3 bg-neutral-50 hover:opacity-85 transition-all text-neutral-800 rounded-lg font-semibold"
      >
        Take Me Back to the Music
      </Link>
    </div>
  );
};

export default NotFoundPage;
