import {create} from 'zustand';
import type {User} from '../types';
import authService from "../api/authService.ts";
import friendService from "../api/friendService.ts";
import groupService from "../api/groupService.ts";

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
            await friendService.getFriendRequests().then((response => {
                console.log(response.data.requests);
                set({friendRequests: response.data.requests});
                console.log("Friend requests fetched successfully", useAppStore.getState().friendRequests);
            }));

        } catch (error) {
            console.error("Error fetching friend requests:", error);
            set({friendRequests: []});
        }
    },
    getFriendRequests: () => useAppStore.getState().friendRequest,
    groups: [],
    fetchGroups: async () => {
        await groupService.getGroups().then((res) => {
            console.log("Groups fetched successfully", res.data);
            set({groups: res.data});
            console.log("Groups in store:", useAppStore.getState().groups);
        })
    },
    getGroups: () => useAppStore.getState().groups,
}));