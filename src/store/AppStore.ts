import {create} from 'zustand';
import type {User} from '../types';
import authService from "../api/authService.ts";

interface AppState {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
    verifyAuth: () => Promise<void>;
    friendRequests: any[]; // changed from string[] to any[]
    fetchFriendRequests: () => Promise<void>;
    groups: any[]; // <-- add this line
    fetchGroups: () => Promise<void>;
    getGroups: () => any[];
}

export const useAppStore = create<AppState>((set) => {
    return ({
        user: null,
        setUser: (user) => set({user}),
        clearUser: () => set({user: null}),
        verifyAuth: async () => {
            try {
                authService.verifyToken().then((res) => {
                    set({user: res.data.user});
                    console.log("Token verified successfully");

                }).catch((err) => {
                    console.log("Token verification failed:", err);
                    set({user: null})
                })

            } catch (error) {
                console.error("Error verifying authentication:", error);
                set({user: null});
            }
        },

    });
});