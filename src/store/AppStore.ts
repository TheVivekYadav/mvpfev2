import { create } from "zustand";
import authService from "../api/authService";
import { groupService } from "../api/groupService";
import type { User } from "../types";
import { showErrorToast, showSuccessToast } from "../utils/toast";

interface AppState {
  user: User | null;
  isLoading: boolean;
  groups: any[]; // Changed from string[] to any[]
  selectedGroup: any | null; // Added this missing property
  login: (email: string, password: string) => Promise<boolean>;
  verifyAuth: () => Promise<void>;
  getAllGroups: () => Promise<void>;
  getGroupById: (groupId: string) => Promise<any>;
  logout: () => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  isLoading: true,
  groups: [],
  selectedGroup: null,

  login: async (email, password) => {
    try {
      const res = await authService.login({ email, password });
      console.log(res.data.user);
      if (res.data.user) {
        set({ user: res.data.user });
        return true;
      }
      set({ user: null });
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      set({ user: null });
      return false;
    }
  },

  logout: async () => {
    try {
      await authService.logout();
      set({ user: null });
      showSuccessToast("Logout Successfully");
    } catch (err: any) {
      showErrorToast(`Error Logout ${err?.message}`);
    }
  },

  verifyAuth: async () => {
    try {
      const res = await authService.verifyToken();
      if (res.data?.user) {
        set({ user: res.data.user });
      } else {
        set({ user: null });
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      set({ user: null });
    } finally {
      set({ isLoading: false });
    }
  },

  getAllGroups: async () => {
    try {
      const res = await groupService.getAllGroups();
      set({ groups: res.data?.groups || [] });
    } catch (error) {
      console.error("Failed to get groups:", error);
      set({ groups: [] });
    }
  },

  getGroupById: async (groupId: string) => {
    try {
      // Now get() will work
      const existingGroup = get().groups.find((g: any) => g._id === groupId);
      if (existingGroup) {
        set({ selectedGroup: existingGroup });
        return existingGroup;
      }

      // If not found, fetch from API
      const res = await groupService.getGroupById(groupId);
      const group = res.data;
      set({ selectedGroup: group });
      return group;
    } catch (error) {
      console.error("Failed to get group:", error);
      showErrorToast("Failed to load group");
      return null;
    }
  },
}));
