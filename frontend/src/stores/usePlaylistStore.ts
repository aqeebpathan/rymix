import { toast } from "sonner";
import { create } from "zustand";

import { Playlist } from "../types";
import { AxiosInstance } from "../lib/axios";

interface PlaylistState {
  playlists: Playlist[];
  isLoading: boolean;
  currentPlaylist: Playlist | null;
  isCreateModalOpen: boolean;

  fetchPlaylists: () => Promise<void>;
  createPlaylist: (name: string, isPublic: boolean) => Promise<void>;
  fetchPlaylistSongs: (playlistId: string) => Promise<void>;
  deletePlaylist: (playlistId: string) => Promise<void>;
  addSongToPlaylist: (playlistId: string, songId: string) => Promise<void>;

  openCreateModal: () => void;
  closeCreateModal: () => void;

  reset: () => void;
}

const usePlaylistStore = create<PlaylistState>((set) => ({
  playlists: [],
  isLoading: false,
  currentPlaylist: null,
  isCreateModalOpen: false,

  fetchPlaylists: async () => {
    set({ isLoading: true });
    try {
      const res = await AxiosInstance.get("/playlists");
      set({ playlists: res.data.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  createPlaylist: async (name, isPublic) => {
    set({ isLoading: true });
    try {
      const res = await AxiosInstance.post("/playlists", { name, isPublic });
      const newPlaylist = res.data.data;
      set((state) => ({ playlists: [...state.playlists, newPlaylist] }));
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchPlaylistSongs: async (playlistId) => {
    set({ isLoading: true });
    try {
      const res = await AxiosInstance.get(`/playlists/${playlistId}`);
      set({ currentPlaylist: res.data.data });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  },

  deletePlaylist: async (playlistId) => {
    set({ isLoading: true });
    try {
      const res = await AxiosInstance.delete(`/playlists/${playlistId}`);

      set((state) => ({
        playlists: state.playlists.filter(
          (playlist) => playlist._id !== playlistId
        ),
      }));

      set({ currentPlaylist: null });
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  addSongToPlaylist: async (playlistId, songId) => {
    set({ isLoading: true });
    try {
      const res = await AxiosInstance.put(`/playlists/${playlistId}/add-song`, {
        songId,
      });

      const updatedPlaylist = res.data.data.songs;

      set((state) => ({
        playlists: state.playlists.map((playlist) =>
          playlist._id === playlistId
            ? { ...playlist, songs: updatedPlaylist }
            : playlist
        ),
      }));

      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  openCreateModal: () => set({ isCreateModalOpen: true }),
  closeCreateModal: () => set({ isCreateModalOpen: false }),

  reset: () => set({ playlists: [] }),
}));

export default usePlaylistStore;
