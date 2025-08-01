import axiosInstance from "./axios.ts";

export const friendService = {
    sendFriendRequest: async (toUserId: string) => {
        return axiosInstance.post("contacts/friend-request", {toUserId});
    },
    getAllFriendRequests: async () => {
        return axiosInstance.get("contacts/friend-requests");
    },
    acceptFriendRequest: async (userId) => {
        return axiosInstance.post("contacts/add", {userId})
    }
}
