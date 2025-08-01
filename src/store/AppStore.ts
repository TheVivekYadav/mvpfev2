import {create} from 'zustand';
import authService from "../api/authService.ts";
import type {User} from '../types';

interface AppState {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
    login: (email: string, password: string) => Promise<boolean>;
    verifyAuth: () => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
    user: null,
    setUser: (user) => set({user}),
    clearUser: () => set({user: null}),
    login: async (email, password) => {
        try {
            const res = await authService.login({email, password});
            if (res.data && res.data.user) {
                set({user: res.data.user});
                return true;
            }
            return false;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            set({user: null});
            return false;
        }
    },
    verifyAuth: async () => {
        try {
            const res = await authService.verifyToken();
            if (res.data && res.data.user) {
                set({user: res.data.user});
            } else {
                set({user: null});
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            set({user: null});
        }
    },
}));
