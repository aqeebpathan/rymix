import { toast } from "sonner";
import { Link } from "react-router-dom";
import { CircleUser, Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";

import useAuthStore from "../stores/useAuthStore";
import useMusicStore from "../stores/useMusicStore";

const Header = () => {
  const [randomSong, setRandomSong] = useState<string | null>(null);
  const { fetchSongTitles, songTitles } = useMusicStore();
  const { user, isAuthenticated, isCheckingAuth, logout } = useAuthStore();

  useEffect(() => {
    fetchSongTitles();
  }, [fetchSongTitles]);

  useEffect(() => {
    if (songTitles.length > 0) {
      setRandomSong(songTitles[Math.floor(Math.random() * songTitles.length)]);
    }
  }, [songTitles]);

  const handleProfileClick = () => {
    const greetings = [
      `Hey ${user?.username}! 🌟`,
      `What's up, ${user?.username}? 😃`,
      `Hello there, ${user?.username}! 👋`,
      `Ahoy, ${user?.username}! ⚓️`,
      `Howdy, ${user?.username}! 🤠`,
      `Salutations, ${user?.username}! ✨`,
      `Greetings, ${user?.username}! 🚀`,
      `Yo ${user?.username}! 🔥`,
    ];

    const randomGreeting =
      greetings[Math.floor(Math.random() * greetings.length)];
    toast.message(randomGreeting);
  };

  return (
    <header className="flex-shrink-0 ">
      <div className="w-full flex justify-between items-center px-3 py-2 min-h-[60px]">
        <Link
          to="/"
          className="text-3xl font-semibold text-neutral-50 flex gap-2 items-center md:ml-4"
        >
          <img src="/logo.png" alt="Rymix logo" className="w-8" /> Rymix
        </Link>

        <div className="hidden sm:inline">
          <h3 className="text-neutral-50 font-medium flex gap-1 items-center">
            <span className="italic font-normal text-neutral-400 text-sm mr-px">
              Try saying:
            </span>
            Hey Rymix, play
            {randomSong ? (
              <>
                <span>'{randomSong}'</span>
              </>
            ) : (
              <Ellipsis className="animate-pulse size-7 -ml-px mt-px" />
            )}
          </h3>
        </div>

        <div className="min-w-[129px]">
          {isCheckingAuth ? (
            <></>
          ) : (
            <div className="flex items-center space-x-4 font-semibold text-sm justify-end">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => logout()}
                    className="text-neutral-400 cursor-pointer mr-4"
                  >
                    Logout
                  </button>
                  <CircleUser
                    className="size-7 text-neutral-100 cursor-pointer hover:opacity-85 transition-all"
                    onClick={handleProfileClick}
                  />
                </>
              ) : (
                <>
                  <Link to="/signup" className="text-neutral-400">
                    Sign up
                  </Link>
                  <Link
                    to="/login"
                    className="bg-neutral-100 text-neutral-950 py-3 px-7 rounded-full font-bold cursor-pointer"
                  >
                    Log in
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
