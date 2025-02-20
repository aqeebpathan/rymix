import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AlignStartVertical, GridIcon, InfoIcon } from "lucide-react";

const navItems = [
  { name: "Home", icon: GridIcon, link: "/" },
  { name: "Library", icon: AlignStartVertical, link: "/library" },
  { name: "Credits", icon: InfoIcon, link: "/credits" },
];

const MobileNavigation = () => {
  const { pathname } = useLocation();
  const [active, setActive] = useState(pathname);

  return (
    <div className="flex md:hidden flex-shrink-0 p-2 bg-neutral-800/40 border border-neutral-800 mx-3 mb-2 rounded-lg">
      <div className="flex w-full gap-2">
        {navItems.map(({ name, icon: Icon, link }) => (
          <Link
            key={name}
            to={link}
            target={link === "/credits" ? "_blank" : undefined}
            onClick={() => setActive(link)}
            className={`flex items-center p-2 rounded transition-all duration-300 ${
              active === link
                ? "bg-neutral-50 text-neutral-950 flex-1 justify-center px-4"
                : "bg-neutral-800 w-12 justify-center"
            }`}
          >
            <Icon className="size-5" />
            <span
              className={`text-sm font-semibold transition-all duration-300 ${
                active === link
                  ? "ml-1 opacity-100 w-auto"
                  : "opacity-0 w-0 overflow-hidden"
              }`}
            >
              {name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;
