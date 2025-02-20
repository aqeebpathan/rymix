import { Outlet } from "react-router-dom";

import AudioPlayer from "./AudioPlayer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import PlaybackControls from "./PlaybackControls";
import usePlayerStore from "../stores/usePlayerStore";
import MobileNavigation from "../components/MobileNavigation";

const MainLayout = () => {
  const { currentSong } = usePlayerStore();
  return (
    <div className="bg-neutral-950 text-neutral-50 h-screen flex flex-col">
      {/* Audio Player */}
      <AudioPlayer />

      {/* Header */}
      <Header />

      {/* Main Content (Sidebar + Outlet) should take the remaining space */}
      <div className="flex flex-1 overflow-hidden space-x-2 px-3 mb-2">
        {/* Sidebar */}
        <Sidebar />

        {/* Outlet (Main Content) */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>

      {/* Playback Controls */}
      {currentSong && <PlaybackControls />}

      <MobileNavigation />
    </div>
  );
};

export default MainLayout;
