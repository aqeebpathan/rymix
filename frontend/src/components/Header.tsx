import { toast } from "sonner";
import { Link } from "react-router-dom";
import { CircleUser } from "lucide-react";

import useAuthStore from "../stores/useAuthStore";

const Header = () => {
  const { user, isAuthenticated, isCheckingAuth, logout } = useAuthStore();

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

        {isCheckingAuth ? (
          <></>
        ) : (
          <div className="font-semibold flex items-center space-x-4 text-sm">
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
    </header>
  );
};

export default Header;
