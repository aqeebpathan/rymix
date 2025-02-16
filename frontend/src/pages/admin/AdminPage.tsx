import { useEffect } from "react";

import Tabs from "./components/Tabs";
import Header from "./components/Header";
import SongsTab from "./components/SongsTab";
import AlbumsTab from "./components/AlbumsTab";
import useMusicStore from "../../stores/useMusicStore";
import DashboardStats from "./components/DashboardStats";

const AdminPage = () => {
  const { fetchSongs, fetchAlbums, fetchStats } = useMusicStore();

  useEffect(() => {
    fetchSongs();
    fetchAlbums();
    fetchStats();
  }, [fetchSongs, fetchAlbums, fetchStats]);

  const tabData = [
    { id: "songs", label: "Songs", content: <SongsTab /> },
    { id: "albums", label: "Albums", content: <AlbumsTab /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-0">
      <Header />
      <DashboardStats />
      <Tabs tabs={tabData} />
    </div>
  );
};

export default AdminPage;
