import {create} from 'zustand';
import type {User} from '../types';
import authService from '../api/authService';

interface AppState {
    user: User | null;
    isLoading: boolean; // Add isLoading to track auth status
    login: (email: string, password: string) => Promise<boolean>;
    verifyAuth: () => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
    user: null,
    isLoading: true, // Start as true to handle the initial auth check

    login: async (email, password) => {
        try {
            const res = await authService.login({email, password});
            if (res.data?.user) {
                set({user: res.data.user});
                return true;
            }
            // If login fails on the server side
            set({user: null});
            return false;
        } catch (error) {
            // If the request itself fails
            console.error("Login failed:", error);
            set({user: null});
            return false;
        }
    },

    verifyAuth: async () => {
        // No need to set isLoading here if it's already true on init
        try {
            const res = await authService.verifyToken();
            if (res.data?.user) {
                set({user: res.data.user});
            } else {
                set({user: null});
            }
        } catch (error) {
            // This is expected if the user has no valid token
            set({user: null});
        } finally {
            // This runs after the try/catch block finishes
            set({isLoading: false});
        }
    },
}));