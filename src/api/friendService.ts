import axiosInstance from "./axios.ts";

const friendService = {
    sendFriendRequest: async (toUserId: string) => {
        return await axiosInstance.post("/contacts/friend-request", {
            toUserId: toUserId
        });
    },
    getFriendRequests: async () => {
        return await axiosInstance.get("/contacts/friend-requests");
    }
}
export default friendService;