import {create} from 'zustand';
import type {User} from '../types';
import authService from '../api/authService';
import {groupService} from '../api/groupService';

interface AppState {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    verifyAuth: () => Promise<void>;
    groups: string[];
    getAllGroups: () => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
    user: null,
    isLoading: true,
    groups: [],

    login: async (email, password) => {
        try {
            const res = await authService.login({email, password});
            if (res.data?.user) {
                set({user: res.data.user});
                return true;
            }
            set({user: null});
            return false;
        } catch (error) {
            console.error("Login failed:", error);
            set({user: null});
            return false;
        }
    },

    verifyAuth: async () => {
        try {
            const res = await authService.verifyToken();
            if (res.data?.user) {
                set({user: res.data.user});
            } else {
                set({user: null});
            }
        } catch (error) {
            console.error("Token verification failed:", error);
            set({user: null});
        } finally {
            set({isLoading: false});
        }
    },

    getAllGroups: async () => {
        try {
            const res = await groupService.getAllGroups();
            set({groups: res.data?.groups || []});
        } catch (error) {
            console.error("Failed to get groups:", error);
            set({groups: []});
        }
    },
}));