import axiosInstance from "./axios";
import type {Group, GroupData} from "../types";

const groupService = {
    getGroups: async () => {
        return await axiosInstance.get("/groups");
    },

    createGroup: async (groupData:GroupData) => {
        return await axiosInstance.post("/groups/create", groupData);
    },

    getGroupById: async (groupId:Group) => {
        return await axiosInstance.get(`/groups/${groupId}`);
    },

    addMemberToGroup: async ({groupId, userId}) => {
        return await axiosInstance.post(`/groups/${groupId}/add-member`, {userId});
    },

    removeMemberFromGroup: async ({groupId, userId}) => {
        return await axiosInstance.delete(`/groups/${groupId}/remove-member/${userId}`);
    },

    deleteGroup: async (groupId) => {
        return await axiosInstance.delete(`/groups/${groupId}`);
    },
    getGroupMembers: async (groupId) => {
        return await axiosInstance.get(`/groups/${groupId}/members`);
    }
};

export default groupService;
