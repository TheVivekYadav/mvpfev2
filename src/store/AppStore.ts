import {create} from 'zustand';
import type {User} from '../types';
import authService from "../api/authService.ts";
import friendService from "../api/friendService.ts";

interface AppState {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
    verifyAuth: () => Promise<void>;
    friendRequests: string[];
    fetchFriendRequests: () => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
    user: null,
    setUser: (user) => set({user}),
    clearUser: () => set({user: null}),
    verifyAuth: async () => {
        try {
            authService.verifyToken().then((res) => {
                set({user: res.data.user});
                console.log("Token verified successfully");

            }).catch(() => {
                set({user: null})
            })

        } catch (error) {
            console.error("Error verifying authentication:", error);
            set({user: null});
        }
    },
    friendRequests: [],
    fetchFriendRequests: async () => {
        try {
            const res = await friendService.getFriendRequests().then((response => {
                console.log(response.data.request);
            }));
            set({friendRequests: res.data.request}); // Store in state
            console.log("Friend requests fetched successfully", useAppStore.getState().friendRequests);
        } catch (error) {
            console.error("Error fetching friend requests:", error);
            set({friendRequests: []});
        }
    }
}));