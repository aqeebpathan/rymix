import { useEffect } from "react";

import Clock from "./components/Clock";
import SectionGrid from "./components/SectionGrid";
import ScrollArea from "../../components/ScrollArea";
import useMusicStore from "../../stores/useMusicStore";
import FeaturedSection from "./components/FeaturedSection";
// import usePlayerStore from "../../stores/usePlayerStore";
import AlbumsSection from "./components/AlbumsSection";
import DynamicGreeting from "./components/DynamicGreeting";
import { Link } from "react-router-dom";

const HomePage = () => {
  const {
    fetchTrendingSongs,
    fetchMadeForYouSongs,
    madeForYouSongs,
    trendingSongs,
    // featuredSongs,
    isLoading,
  } = useMusicStore();

  // const { initializeQueue } = usePlayerStore();

  useEffect(() => {
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchMadeForYouSongs, fetchTrendingSongs]);

  // useEffect(() => {
  //   if (
  //     madeForYouSongs.length > 0 &&
  //     featuredSongs.length > 0 &&
  //     trendingSongs.length > 0
  //   ) {
  //     const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
  //     initializeQueue(allSongs);
  //   }
  // }, [initializeQueue, madeForYouSongs, trendingSongs, featuredSongs]);

  return (
    <div className="rounded-md overflow-hidden h-full bg-gradient-to-b from-neutral-700/70 to-neutral-950">
      <ScrollArea>
        <div className="p-4 !pr-1 sm:p-6 sm:!pr-3">
          <div className="flex justify-between items-center mb-6">
            <DynamicGreeting />
            <Clock />
          </div>

          <FeaturedSection />

          <AlbumsSection />

          <div className="space-y-8">
            <SectionGrid
              title="Made for you"
              songs={madeForYouSongs}
              isLoading={isLoading}
            />
            <SectionGrid
              title="Trending"
              songs={trendingSongs}
              isLoading={isLoading}
            />
          </div>
        </div>

        <footer className="px-4 md:px-6">
          <div className="border-t border-neutral-800 py-12 text-neutral-500 font-medium tracking-tight text-[15px] leading-tight">
            <p className="mb-1">
              © {new Date().getFullYear()} All rights to music belong to their
              respective owners.
            </p>
            <p>
              Built for learning purposes by{" "}
              <Link
                to="https://aqeeb.vercel.app/"
                target="_blank"
                className="hover:text-neutral-50 transition-colors"
              >
                aqeeb
              </Link>
              . No copyright infringement intended.
            </p>
          </div>
        </footer>
      </ScrollArea>
    </div>
  );
};

export default HomePage;
