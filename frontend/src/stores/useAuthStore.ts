import { toast } from "sonner";
import { create } from "zustand";

import { User } from "../types";
import { AxiosInstance } from "../lib/axios";

interface AuthState {
  user: User | null;
  isCheckingAuth: boolean;
  isAuthenticated: boolean;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isCheckingAdmin: boolean;
  isAdmin: boolean;
}

interface AuthActions {
  signup: (data: {
    email: string;
    password: string;
    username: string;
  }) => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  checkAdminAccess: () => Promise<boolean>;
}

const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  isCheckingAuth: false,
  isAuthenticated: false,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAdmin: false,
  isAdmin: false,

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await AxiosInstance.post("/auth/signup", data);
      set((state) => ({
        ...state,
        user: res.data.data,
        isAuthenticated: true,
      }));
      toast.success(res.data.message);
    } catch (error: unknown) {
      const errorMessage =
        (error as any)?.response?.data?.message || "Signup failed";
      toast.error(errorMessage);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await AxiosInstance.post("/auth/login", data);
      set((state) => ({
        ...state,
        user: res.data.data,
        isAuthenticated: true,
      }));
      toast.success(res.data.message);
    } catch (error: unknown) {
      const errorMessage =
        (error as any)?.response?.data?.message || "Login failed";
      toast.error(errorMessage);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const res = await AxiosInstance.post("/auth/logout");
      set({ user: null, isAuthenticated: false });
      toast.success(res.data.message);
    } catch (error: unknown) {
      const errorMessage =
        (error as any)?.response?.data?.message || "Logout failed";
      toast.error(errorMessage);
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await AxiosInstance.get("/auth/status");
      set({ user: res.data.data, isAuthenticated: true });
    } catch {
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  checkAdminAccess: async () => {
    set({ isCheckingAdmin: true });
    try {
      const res = await AxiosInstance.get("/auth/status");
      const isAdmin = res.data.data.role?.toLowerCase() === "admin";
      set({ isAdmin });
      return isAdmin;
    } catch {
      set({ isAdmin: false });
      return false;
    } finally {
      set({ isCheckingAdmin: false });
    }
  },
}));

export default useAuthStore;
