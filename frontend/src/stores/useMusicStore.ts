import { toast } from "sonner";
import { create } from "zustand";

import { AxiosInstance } from "../lib/axios";
import { Album, Song, Stats } from "../types";

interface MusicStore {
  songs: Song[];
  albums: Album[];
  isLoading: boolean;
  currentAlbum: Album | null;
  featuredSongs: Song[];
  madeForYouSongs: Song[];
  trendingSongs: Song[];
  stats: Stats;

  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchSongs: () => Promise<void>;
  deleteSong: (id: string) => Promise<void>;
  deleteAlbum: (id: string) => Promise<void>;
}

const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  currentAlbum: null,
  isLoading: false,
  featuredSongs: [],
  trendingSongs: [],
  madeForYouSongs: [],
  stats: {
    totalUsers: 0,
    totalSongs: 0,
    totalAlbums: 0,
    totalArtists: 0,
  },

  fetchSongs: async () => {
    set({ isLoading: true });
    try {
      const res = await AxiosInstance.get("/songs");
      set({ songs: res.data.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchStats: async () => {
    set({ isLoading: true });
    try {
      const res = await AxiosInstance.get("/stats");
      set({ stats: res.data.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAlbums: async () => {
    set({ isLoading: true });
    try {
      const res = await AxiosInstance.get("/albums");
      set({ albums: res.data.data });
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAlbumById: async (id) => {
    set({ isLoading: true });
    try {
      const res = await AxiosInstance.get(`/albums/${id}`);
      set({ currentAlbum: res.data.data });
    } catch (error: any) {
      // toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchFeaturedSongs: async () => {
    set({ isLoading: true });
    try {
      const res = await AxiosInstance.get("/songs/featured");
      set({ featuredSongs: res.data.data });
    } catch (error: any) {
      toast.error(error.response.message.data);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMadeForYouSongs: async () => {
    set({ isLoading: true });
    try {
      const res = await AxiosInstance.get("/songs/made-for-you");
      set({ madeForYouSongs: res.data.data });
    } catch (error: any) {
      toast.error(error.response.message.data);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTrendingSongs: async () => {
    set({ isLoading: true });
    try {
      const res = await AxiosInstance.get("/songs/trending");
      set({ trendingSongs: res.data.data });
    } catch (error: any) {
      toast.error(error.response.message.data);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteSong: async (id) => {
    set({ isLoading: true });
    try {
      const res = await AxiosInstance.delete(`/admin/songs/${id}`);

      set((state) => ({
        songs: state.songs.filter((song) => song._id !== id),
      }));

      toast.success(res.data.message);
    } catch (error) {
      // console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteAlbum: async (id) => {
    set({ isLoading: true });
    try {
      const res = await AxiosInstance.delete(`/admin/albums/${id}`);

      set((state) => ({
        albums: state.albums.filter((album) => album._id !== id),
        songs: state.songs.map((song) =>
          song.albumId === state.albums.find((a) => a._id === id)?.title
            ? { ...song, album: null }
            : song
        ),
      }));

      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useMusicStore;
